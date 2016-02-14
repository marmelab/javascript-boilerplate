import crud from '../lib/middlewares/pgCrud';
import koa from 'koa';
import koaMount from 'koa-mount';
import methodFilter from '../lib/middlewares/methodFilter';
import product from './productModel';

const app = koa();
const allowedMethods = ['GET'];

app.use(methodFilter(allowedMethods));

app.use(koaMount('/', crud(product, allowedMethods)));

export default app;
