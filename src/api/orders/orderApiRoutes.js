/* eslint no-param-reassign: off */
import config from 'config';
import Koa from 'koa';
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

const app = new Koa();

app.use(methodFilter(['GET', 'POST', 'DELETE']));

app.use(tokenCheckerMiddleware);

app.use(async (ctx, next) => {
    ctx.userData = await userFactory(ctx.client).findByEmail(ctx.user.email);

    await next();
});

app.use(async (ctx, next) => {
    ctx.orderQueries = orderFactory(ctx.client);
    ctx.productQueries = productFactory(ctx.client);

    await next();
});

const sanitizeProduct = async (p, productQueries) => {
    const product = await productQueries.selectOneById({ id: p.id });
    return Object.assign({}, p, product);
};

app.use(koaRoute.post('/', async (ctx, next) => {
    const orderData = ctx.request.body;

    const products = await Promise.all(orderData.products.map(p => sanitizeProduct(p, ctx.productQueries)));
    const total = products.reduce((t, p) => t + (p.price * (p.quantity || 1)), 0);

    ctx.data = {
        customer_id: ctx.userData.id,
        date: new Date(),
        products,
        reference: uuid.v1(),
        status: OrderStatus.pending,
        total,
    };

    await next();

    await sendEmails(prepareNewOrderMail(
        ctx.userData,
        ctx.data
    ));
}));

app.use(koaRoute.get('/', async (ctx) => {
    ctx.body = await ctx.orderQueries.selectByUserId(ctx.userData.id);
}));

app.use(koaMount('/', crud(orderFactory, {
    GET: 'managed',
    PUT: false,
    POST: 'managed',
    DELETE: 'managed',
})));

export default app;
