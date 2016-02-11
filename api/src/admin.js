import koa from 'koa';
import koaMount from 'koa-mount';

import tokenCheckerMiddleware from './middlewares/tokenChecker';

import authenticateRoutes from './users/authenticateRoutes';

const app = koa();

app.use(koaMount('/authenticate', authenticateRoutes));
app.use(tokenCheckerMiddleware);

export default app;
