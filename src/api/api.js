import config from 'config';
import koa from 'koa';
import koaMount from 'koa-mount';
import koaRoute from 'koa-route';
import rateLimiterMiddleware from './lib/rateLimiter';

import authenticateApiRoutes from './authentication/authenticateApiRoutes';
import methodFilter from './lib/middlewares/methodFilter';
import orderApiRoutes from './orders/orderApiRoutes';
import productApiRoutes from './products/productApiRoutes';

const app = koa();

app.use(rateLimiterMiddleware(config.apps.api.security.rateLimitOptions));
app.use(koaMount('/', authenticateApiRoutes));
app.use(koaMount('/products', productApiRoutes));
app.use(koaMount('/orders', orderApiRoutes));

app.use(methodFilter(['GET']));
app.use(koaRoute.get('/', function* primaryEntryPoint() {
    this.status = 200;
    this.body = {status: 'ok'};
}));

export default app;
