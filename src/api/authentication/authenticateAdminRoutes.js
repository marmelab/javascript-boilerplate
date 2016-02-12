import koa from 'koa';
import koaMount from 'koa-mount';
import authenticateRoutes from './authenticateRoutes';

const app = koa();

app.use(koaMount('/authenticate', authenticateRoutes));

export default app;
