import crud from '../lib/middlewares/pgCrud';
import koa from 'koa';
import koaMount from 'koa-mount';
import methodFilter from '../lib/middlewares/methodFilter';
import productFactory from './productModel';

const app = koa();

app.use(methodFilter(['GET']));

app.use(koaMount('/', crud(productFactory, {
    GET: 'managed',
    PUT: false,
    POST: false,
    DELETE: false,
})));

export default app;
