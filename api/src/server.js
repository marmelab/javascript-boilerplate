import config from 'config';
import path from 'path';
import koa from 'koa';
import compress from 'koa-compressor';

import dbClient from './lib/db/client';
import logger from './lib/logger';

const env = process.env.NODE_ENV || 'development';
const port = config.api.port;

const app = koa();
const appLogger = logger(config.logs.app);
const httpLogger = logger(config.logs.http);

// Server logs
app.use(function* logHttp(next) {
    this.httpLog = {
        method: this.request.method,
        remoteIP: this.request.ip,
        userAgent: this.request.headers['user-agent'],
        app: this.request.url.indexOf('/admin') === 0 ? 'admin' : 'api',
    };

    const sessionId = this.cookies.get('koa:sess');
    if (sessionId) {
        this.httpLog.sessionId = sessionId;
    }

    const authorization = this.get('authorization');
    if (authorization) {
        this.httpLog.authorization = authorization;
    }

    yield next;

    // Static files
    if (['.css', '.js', '.woff'].indexOf(path.extname(this.request.url)) !== -1) {
        return;
    }
    this.httpLog.status = this.status;
    httpLogger.log('info', this.request.url, this.httpLog);
});

// Error catching - override koa's undocumented error handler
app.context.onerror = function onError(err) {
    if (!err) return;

    this.status = err.status || 500;
    this.app.emit('error', err, this);

    if (this.headerSent || !this.writable) {
        err.headerSent = true;
        return;
    }

    if (env === 'development') {
        // respond with the error details
        this.body = JSON.stringify({
            error: err.message,
            stack: err.stack,
            code: err.code,
        });
        this.type = 'json';
    } else {
        // just send the error message
        this.body = err.message;
    }

    this.res.end(this.body);
};

// Error logging
app.on('error', (err, ctx = {}) => {
    const errorDetails = {
        status: ctx.status,
        error: err.message,
        stack: err.stack,
        err: err,
    };

    httpLogger.log('error', typeof ctx.request !== 'undefined' ? ctx.request.url : '', errorDetails);
});

app.dbClient = dbClient(config.db);

if (env !== 'development') {
  // Hide powered-by koa
    app.use(function* hidePoweredBy(next) {
        this.remove('X-Powered-By');
        yield next;
    });

  // gzip compression
    app.use(compress());
}

if (!module.parent || module.parent.filename.indexOf('api/index.js') !== -1) {
    app.listen(port);
    appLogger.info(`API server listening on port ${port}`);
    appLogger.info('Press CTRL+C to stop server');
}

export default app;
