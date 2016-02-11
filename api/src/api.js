import koa from 'koa';
import koaMount from 'koa-mount';

import tokenCheckerMiddleware from './middlewares/tokenChecker';

import authenticateRoutes from './users/authenticateRoutes';
import userApiRoutes from './users/userApiRoutes';

const app = koa();

app.use(koaMount('/authenticate', authenticateRoutes));
app.use(tokenCheckerMiddleware);
app.use(koaMount('/users', userApiRoutes));

export default app;
