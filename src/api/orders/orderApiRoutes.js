import crud from '../middlewares/pgCrud';
import koa from 'koa';
import koaMount from 'koa-mount';
import methodFilter from '../middlewares/methodFilter';
import order from './orderModel';
import tokenCheckerMiddleware from '../middlewares/tokenChecker';

const app = koa();
const allowedMethods = ['GET', 'POST', 'DELETE'];

app.use(methodFilter(allowedMethods));

app.use(tokenCheckerMiddleware);

app.use(koaMount('/', crud(order, allowedMethods)));

export default app;
