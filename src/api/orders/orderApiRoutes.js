/* eslint no-param-reassign: off */
import config from 'config';
import Koa from 'koa';
import koaMount from 'koa-mount';
import koaRoute from 'koa-route';

import crud from '../lib/middlewares/pgCrud';
import methodFilter from '../lib/middlewares/methodFilter';
import orderRepositoryFactory from './orderRepository';
import userRepositoryFactory from '../users/userRepository';
import saveNewOrderFactory from './saveNewOrder';

import sendEmailsFactory from '../lib/mails/sendEmails';
import tokenCheckerMiddleware from '../lib/middlewares/tokenChecker';
import transporterFactory from '../lib/mails/transporter';

const mailConfig = config.apps.api.mails;
const transporter = transporterFactory(mailConfig.transporter);
const sendEmails = sendEmailsFactory(transporter, mailConfig.defaultOptions);

const app = new Koa();

app.use(methodFilter(['GET', 'POST', 'DELETE']));

app.use(tokenCheckerMiddleware);

export const postOrder = saveNewOrderFactoryImpl => async (ctx) => {
    const saveNewOrder = saveNewOrderFactoryImpl(
        orderRepositoryFactory(ctx.client),
        userRepositoryFactory(ctx.client),
        sendEmails
    );

    ctx.body = await saveNewOrder(ctx.user.id, ctx.request.body.products);
};

export const getOrdersForUser = orderRepositoryFactoryimpl => async (ctx) => {
    ctx.body = await orderRepositoryFactoryimpl(ctx.client).selectByUserId(ctx.user.id);
};

app.use(koaRoute.post('/', postOrder(saveNewOrderFactory)));

app.use(koaRoute.get('/', getOrdersForUser(orderRepositoryFactory)));

app.use(koaMount('/', crud(orderRepositoryFactory, {
    GET: 'managed',
})));

export default app;
