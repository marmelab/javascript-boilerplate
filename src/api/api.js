import koa from 'koa';
import koaMount from 'koa-mount';

import authenticateRoutes from './users/authenticateRoutes';
import orderApiRoutes from './orders/orderApiRoutes';
import productApiRoutes from './products/productApiRoutes';

const app = koa();

app.use(koaMount('/authenticate', authenticateRoutes));
app.use(koaMount('/orders', orderApiRoutes));
app.use(koaMount('/products', productApiRoutes));

export default app;
