/* eslint no-param-reassign: off */
import config from 'config';
import Koa from 'koa';
import koaRoute from 'koa-route';

import authenticate from './authenticate';
import rateLimiterMiddleware from '../lib/middlewares/rateLimiter';
import userRepositoryFactory from '../users/userModel';

const app = new Koa();
let userRepository;

app.use(koaRoute.post('/', rateLimiterMiddleware(config.apps.api.security.rateLimitOptions.auth)));

app.use(async (ctx, next) => {
    userRepository = userRepositoryFactory(ctx.client);

    await next();
});

app.use(koaRoute.post('/sign-in', async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await userRepository.authenticate(email, password);
    if (!user) {
        ctx.status = 401;
        ctx.body = 'Invalid credentials.';
        return;
    }

    authenticate(ctx, user, config.apps.api.security);
}));

app.use(koaRoute.post('/sign-up', async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await userRepository.insertOne({ email, password });

    if (!user) {
        ctx.status = 401;
        return;
    }

    authenticate(ctx, user, config.apps.api.security);
}));

export default app;
