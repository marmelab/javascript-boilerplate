import koa from 'koa';
import koaMount from 'koa-mount';

import tokenCheckerMiddleware from './middlewares/tokenChecker';

import authenticateRoutes from './users/authenticateRoutes';
import orderApiRoutes from './orders/orderApiRoutes';
import productApiRoutes from './products/productApiRoutes';
import userApiRoutes from './users/userApiRoutes';

const app = koa();

app.use(koaMount('/authenticate', authenticateRoutes));
app.use(tokenCheckerMiddleware);
app.use(koaMount('/orders', orderApiRoutes));
app.use(koaMount('/products', productApiRoutes));
app.use(koaMount('/users', userApiRoutes));

export default app;
