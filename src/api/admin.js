import koa from 'koa';
import koaMount from 'koa-mount';

import tokenCheckerMiddleware from './middlewares/tokenChecker';

import authenticateRoutes from './users/authenticateRoutes';
import productAdminApiRoutes from './products/productAdminApiRoutes';
import orderAdminApiRoutes from './orders/orderAdminApiRoutes';

const app = koa();

app.use(koaMount('/authenticate', authenticateRoutes));
app.use(tokenCheckerMiddleware);

app.use(koaMount('/products', productAdminApiRoutes));
app.use(koaMount('/orders', orderAdminApiRoutes));

export default app;
