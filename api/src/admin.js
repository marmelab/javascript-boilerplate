import config from 'config';
import Koa from 'koa';
import koaMount from 'koa-mount';

import rateLimiterMiddleware from './lib/middlewares/rateLimiter';
import tokenCheckerMiddleware from './lib/middlewares/tokenChecker';

import authenticateAdminRoutes from './authentication/authenticateAdminRoutes';
import productAdminApiRoutes from './products/productAdminApiRoutes';
import orderAdminApiRoutes from './orders/orderAdminApiRoutes';
import orderProductAdminApiRoutes from './order-products/orderAdminApiRoutes';

const app = new Koa();

app.use(koaMount('/authenticate', authenticateAdminRoutes));
app.use(rateLimiterMiddleware(config.apps.api.security.rateLimitOptions.api));
app.use(tokenCheckerMiddleware);

app.use(koaMount('/products', productAdminApiRoutes));
app.use(koaMount('/orders', orderAdminApiRoutes));
app.use(koaMount('/order-products', orderProductAdminApiRoutes));

export default app;
