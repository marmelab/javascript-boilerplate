import coBody from 'co-body';
import crud from '../lib/middlewares/pgCrud';
import koa from 'koa';
import koaMount from 'koa-mount';
import koaRoute from 'koa-route';
import methodFilter from '../lib/middlewares/methodFilter';
import orderFactory from './orderModel';
import tokenCheckerMiddleware from '../lib/middlewares/tokenChecker';
import userFactory from '../users/userModel';
import uuid from 'uuid';

const app = koa();

app.use(methodFilter(['GET', 'POST', 'DELETE']));

app.use(tokenCheckerMiddleware);

app.use(function* getUser(next) {
    this.userData = yield userFactory(this.client).findByEmail(this.user.email);

    yield next;
});

app.use(koaRoute.post('/', function* postUserOrder(next) {
    this.data = yield coBody(this);
    this.data.reference = uuid.v1();
    this.data.customer_id = this.userData.id;
    this.data.date = new Date();

    yield next;
}));

app.use(koaMount('/', crud(orderFactory, {
    GET: false,
    PUT: false,
    POST: 'managed',
    DELETE: 'managed',
})));

app.use(koaRoute.get('/', function* getUserOrders() {
    const orderQueries = orderFactory(this.client);

    this.body = yield orderQueries.selectByUserId(this.userData.id);
}));

export default app;
