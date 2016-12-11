import config from 'config';
import Koa from 'koa';
import koaRoute from 'koa-route';

import authenticate from './authenticate';
import methodFilterMiddleware from '../lib/middlewares/methodFilter';
import rateLimiterMiddleware from '../lib/middlewares/rateLimiter';
import userRepositoryFactory from '../users/userRepository';
import sendAuthenticatedResponse from './sendAuthenticatedResponse';

const app = new Koa();

app.use(methodFilterMiddleware(['POST']));
app.use(koaRoute.post('/', rateLimiterMiddleware(config.apps.api.security.rateLimitOptions.auth)));

app.use(koaRoute.post('/', async (ctx) => {
    const { email, password } = ctx.request.body;
    const userRepository = userRepositoryFactory(ctx.client);
    const user = await authenticate(userRepository)(email, password);

    if (!user) {
        this.body = 'Invalid credentials.';
        this.status = 401;
        return;
    }

    sendAuthenticatedResponse(ctx, user, config.apps.api.security);
}));

export default app;
