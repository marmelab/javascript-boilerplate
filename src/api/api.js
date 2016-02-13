import koa from 'koa';
import koaMount from 'koa-mount';
import koaRoute from 'koa-route';

import authenticateRoutes from './users/authenticateRoutes';
import orderApiRoutes from './orders/orderApiRoutes';
import productApiRoutes from './products/productApiRoutes';

const app = koa();

app.use(koaMount('/authenticate', authenticateRoutes));
app.use(koaMount('/orders', orderApiRoutes));
app.use(koaMount('/products', productApiRoutes));

app.use(function* filterRequestMethod(next) {
    const clean = method => method.toLowerCase().trim();
    const method = clean(this.method);

    if (method !== 'get') {
        this.status = 405;
        this.body = {};
        return;
    }

    yield next;
});

app.use(koaRoute.get('/', function* primaryEntryPoint() {
    this.status = 200;
    this.body = {status: 'ok'};
}));

export default app;
