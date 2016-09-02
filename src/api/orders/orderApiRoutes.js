import co from 'co';
import coBody from 'co-body';
import config from 'config';
import koa from 'koa';
import koaMount from 'koa-mount';
import koaRoute from 'koa-route';
import uuid from 'uuid';

import crud from '../lib/middlewares/pgCrud';
import methodFilter from '../lib/middlewares/methodFilter';
import orderFactory, { OrderStatus } from './orderModel';
import prepareNewOrderMail from './mails/newOrderMail';
import productFactory from '../products/productModel';
import sendEmailsFactory from '../lib/mails/sendEmails';
import tokenCheckerMiddleware from '../lib/middlewares/tokenChecker';
import transporterFactory from '../lib/mails/transporter';
import userFactory from '../users/userModel';

const mailConfig = config.apps.api.mails;
const transporter = transporterFactory(mailConfig.transporter);
const sendEmails = sendEmailsFactory(transporter, mailConfig.defaultOptions);

const app = koa();

app.use(methodFilter(['GET', 'POST', 'DELETE']));

app.use(tokenCheckerMiddleware);

app.use(function* getUser(next) {
    this.userData = yield userFactory(this.client).findByEmail(this.user.email);

    yield next;
});

app.use(function* setQueries(next) {
    this.orderQueries = orderFactory(this.client);
    this.productQueries = productFactory(this.client);

    yield next;
});

app.use(koaRoute.post('/', function* postUserOrder(next) {
    const orderData = yield coBody(this);
    const productQueries = this.productQueries;
    const products = yield orderData.products.map(co.wrap(function* getProduct(p) {
        const product = yield productQueries.selectOneById(p.id);

        return Object.assign({}, p, product);
    }));

    const total = products.reduce((t, p) => t + p.price * (p.quantity || 1), 0);

    this.data = {
        customer_id: this.userData.id,
        date: new Date(),
        products,
        reference: uuid.v1(),
        status: OrderStatus.pending,
        total,
    };

    yield next;

    yield sendEmails(prepareNewOrderMail(
        this.userData,
        this.data
    ));
}));

app.use(koaMount('/', crud(orderFactory, {
    GET: false,
    PUT: false,
    POST: 'managed',
    DELETE: 'managed',
})));

app.use(koaRoute.get('/', function* getUserOrders() {
    this.body = yield this.orderQueries.selectByUserId(this.userData.id);
}));

app.use(koaRoute.get('/:id', function* getUserOrder(id) {
    this.body = yield this.orderQueries.selectOneById(id);
}));

export default app;
