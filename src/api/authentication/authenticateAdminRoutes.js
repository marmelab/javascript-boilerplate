import crypto from 'crypto';
import coBody from 'co-body';
import config from 'config';
import jwt from 'jsonwebtoken';
import Koa from 'koa';
import koaRoute from 'koa-route';
import methodFilter from '../lib/middlewares/methodFilter';
import rateLimiter from '../lib/middlewares/rateLimiter';
import userRepositoryFactory from '../users/userModel';

const app = new Koa();

app.use(methodFilter(['POST']));
app.use(koaRoute.post('/', rateLimiter(config.apps.api.security.rateLimitOptions.auth)));

app.use(koaRoute.post('/', async ctx => {
    const { email, password } = await coBody(ctx);
    const userRepository = userRepositoryFactory(ctx.client);
    const user = await userRepository.authenticate(email, password);
    if (!user) {
        this.body = 'Invalid credentials.';
        this.status = 401;
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

export default app;
