import Koa from 'koa';
import koaMount from 'koa-mount';
import crud from '../lib/middlewares/pgCrud';
import methodFilter from '../lib/middlewares/methodFilter';
import productFactory from './productModel';

const app = new Koa();

app.use(methodFilter(['GET']));

app.use(koaMount('/', crud(productFactory, {
    GET: 'managed',
    PUT: false,
    POST: false,
    DELETE: false,
})));

export default app;
