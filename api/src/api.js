/* eslint no-param-reassign: off */
import config from 'config';
import Koa from 'koa';
import koaMount from 'koa-mount';
import koaRoute from 'koa-route';

import authenticateApiRoutes from './authentication/authenticateApiRoutes';
import methodFilter from './lib/middlewares/methodFilter';
import orderApiRoutes from './orders/orderApiRoutes';
import productApiRoutes from './products/productApiRoutes';
import rateLimiterMiddleware from './lib/middlewares/rateLimiter';

const app = new Koa();

app.use(koaMount('/', authenticateApiRoutes));

app.use(rateLimiterMiddleware(config.apps.api.security.rateLimitOptions.api));
app.use(koaMount('/products', productApiRoutes));
app.use(koaMount('/orders', orderApiRoutes));

app.use(methodFilter(['GET']));
app.use(koaRoute.get('/', async ctx => {
    ctx.status = 200;
    ctx.body = { status: 'ok' };
}));

export default app;
