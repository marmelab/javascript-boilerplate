import koa from 'koa';
import koaMount from 'koa-mount';
import koaRoute from 'koa-route';

import authenticateRoutes from './users/authenticateRoutes';
import methodFilter from './middlewares/methodFilter';
import orderApiRoutes from './orders/orderApiRoutes';
import productApiRoutes from './products/productApiRoutes';

const app = koa();

app.use(koaMount('/authenticate', authenticateRoutes));
app.use(koaMount('/products', productApiRoutes));
app.use(koaMount('/orders', orderApiRoutes));


app.use(methodFilter(['GET']));
app.use(koaRoute.get('/', function* primaryEntryPoint() {
    this.status = 200;
    this.body = {status: 'ok'};
}));

export default app;
