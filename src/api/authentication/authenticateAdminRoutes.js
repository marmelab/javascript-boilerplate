import config from 'config';
import Koa from 'koa';
import koaRoute from 'koa-route';

import authenticate from './authenticate';
import methodFilter from '../lib/middlewares/methodFilter';
import rateLimiter from '../lib/middlewares/rateLimiter';
import userRepositoryFactory from '../users/userModel';

const app = new Koa();

app.use(methodFilter(['POST']));
app.use(koaRoute.post('/', rateLimiter(config.apps.api.security.rateLimitOptions.auth)));

app.use(koaRoute.post('/', async (ctx) => {
    const { email, password } = ctx.request.body;
    const userRepository = userRepositoryFactory(ctx.client);
    const user = await userRepository.authenticate(email, password);

    if (!user) {
        this.body = 'Invalid credentials.';
        this.status = 401;
        return;
    }

    authenticate(ctx, user, config.apps.api.security);
}));

export default app;
