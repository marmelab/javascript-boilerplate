/* eslint no-param-reassign: off */
import path from 'path';

export default httpLogger => async (ctx, next) => {
    ctx.httpLog = {
        method: ctx.request.method,
        remoteIP: ctx.request.ip,
        userAgent: ctx.request.headers['user-agent'],
        app: ctx.request.url.indexOf('/admin') === 0 ? 'admin' : 'api',
    };

    const sessionId = ctx.cookies.get('koa:sess');
    if (sessionId) {
        ctx.httpLog.sessionId = sessionId;
    }

    const authorization = ctx.get('authorization');
    if (authorization) {
        ctx.httpLog.authorization = authorization;
    }

    await next();

    // Static files
    if (['.css', '.js', '.woff'].indexOf(path.extname(ctx.request.url)) !== -1) {
        return;
    }
    ctx.httpLog.status = ctx.status;
    httpLogger.log('info', ctx.request.url, ctx.httpLog);
};
