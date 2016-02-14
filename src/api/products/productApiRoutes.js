import crud from '../middlewares/pgCrud';
import koa from 'koa';
import koaMount from 'koa-mount';
import methodFilter from '../middlewares/methodFilter';
import product from './productModel';

const app = koa();
const allowedMethods = ['GET'];

app.use(methodFilter(allowedMethods));

app.use(koaMount('/', crud(product, allowedMethods)));

export default app;
