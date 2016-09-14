/* eslint no-param-reassign: off */
import coBody from 'co-body';
import config from 'config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Koa from 'koa';
import koaRoute from 'koa-route';
import rateLimiterMiddleware from '../lib/middlewares/rateLimiter';
import userRepositoryFactory from '../users/userModel';

const app = new Koa();
let userRepository;

app.use(koaRoute.post('/', rateLimiterMiddleware(config.apps.api.security.rateLimitOptions.auth)));

app.use(async (ctx, next) => {
    userRepository = userRepositoryFactory(ctx.client);

    await next();
});

app.use(koaRoute.post('/sign-in', async ctx => {
    const { email, password } = await coBody(ctx);
    const user = await userRepository.authenticate(email, password);
    if (!user) {
        this.status = 401;
        this.body = 'Invalid credentials.';
        return;
    }

    const token = jwt.sign(user, config.apps.api.security.jwt.privateKey);
    const cookieToken = crypto.createHmac('sha256', config.apps.api.security.secret)
        .update(token)
        .digest('hex');
    const delay = config.apps.api.security.expirationTokenDelay * 1000;
    const tokenExpires = (new Date((new Date()).getTime() + delay));

    ctx.cookies.set('token', cookieToken, Object.assign(config.apps.api.cookies, {
        expires: tokenExpires,
        httpOnly: true,
    }));

    ctx.body = {
        id: user.id,
        email: user.email,
        expires: tokenExpires.getTime(),
        token,
    };
}));

app.use(koaRoute.post('/sign-up', async ctx => {
    const { email, password } = await coBody(ctx);
    const user = await userRepository.insertOne({ email, password });

    if (!user) {
        ctx.status = 401;
        return;
    }

    ctx.body = {
        id: user.id,
        email: user.email,
        token: jwt.sign(user, config.apps.api.security.jwt.privateKey),
    };
}));

export default app;
