import config from 'config';
import koa from 'koa';
import koaMount from 'koa-mount';

import rateLimiterMiddleware from './lib/rateLimiter';
import tokenCheckerMiddleware from './lib/middlewares/tokenChecker';

import authenticateAdminRoutes from './authentication/authenticateAdminRoutes';
import productAdminApiRoutes from './products/productAdminApiRoutes';
import orderAdminApiRoutes from './orders/orderAdminApiRoutes';

const app = koa();

app.use(rateLimiterMiddleware(config.apps.api.security.rateLimitOptions));
app.use(koaMount('/authenticate', authenticateAdminRoutes));
app.use(tokenCheckerMiddleware);

app.use(koaMount('/products', productAdminApiRoutes));
app.use(koaMount('/orders', orderAdminApiRoutes));

export default app;
