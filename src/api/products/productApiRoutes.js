import Koa from 'koa';
import koaMount from 'koa-mount';
import crud from '../lib/middlewares/pgCrud';
import methodFilter from '../lib/middlewares/methodFilter';
import productRepositoryFactory from './productRepository';

const app = new Koa();

app.use(methodFilter(['GET']));

app.use(koaMount('/', crud(productRepositoryFactory, {
    GET: 'managed',
    PUT: false,
    POST: false,
    DELETE: false,
})));

export default app;
