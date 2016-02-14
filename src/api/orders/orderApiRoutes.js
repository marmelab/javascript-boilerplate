import crud from '../lib/middlewares/pgCrud';
import koa from 'koa';
import koaMount from 'koa-mount';
import koaRoute from 'koa-route';
import methodFilter from '../lib/middlewares/methodFilter';
import orderFactory from './orderModel';
import tokenCheckerMiddleware from '../lib/middlewares/tokenChecker';
import userFactory from '../users/userModel';

const app = koa();

app.use(methodFilter(['GET', 'POST', 'DELETE']));

app.use(tokenCheckerMiddleware);

app.use(koaMount('/', crud(orderFactory, ['POST', 'DELETE'])));

app.use(koaRoute.get('/', function* getUserOrders() {
    const orderQueries = orderFactory(this.client);
    const user = yield userFactory(this.client).findByEmail(this.user.email);

    this.body = yield orderQueries.selectByUserId(user.id);
}));

export default app;
