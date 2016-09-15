import config from 'config';
import Koa from 'koa';
import koaBodyParser from 'koa-bodyparser';
import koaCors from 'kcors';
import koaMount from 'koa-mount';
import koaHelmet from 'koa-helmet';
import { PgPool } from 'co-postgres-queries';
import compress from 'koa-compress';

import logger from './lib/logger';
import xdomainRoute from './lib/xdomainRoute';
import connectToDbMiddleware from './lib/middlewares/connectToDb';
import httpLoggerMiddleware from './lib/middlewares/httpLogger';

import healthcare from './healthcare';
import api from './api';
import admin from './admin';

const pool = new PgPool(config.apps.api.db);

const env = process.env.NODE_ENV || 'development';
const port = config.apps.api.port;

const app = new Koa();
const appLogger = logger(config.apps.api.logs.app);
const httpLogger = logger(config.apps.api.logs.http);

// Server logs
app.use(httpLoggerMiddleware(httpLogger));

// Error catching - override koa's undocumented error handler
app.context.onerror = function onError(err) {
    if (!err) return;

    this.status = err.status || 500;
    this.app.emit('error', err, this);

    if (this.headerSent || !this.writable) {
        err.headerSent = true; // eslint-disable-line no-param-reassign
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
        err,
    };
    const url = typeof ctx.request !== 'undefined' ? ctx.request.url : '';
    httpLogger.log('error', url, errorDetails);
});

process.on('unhandledRejection', (error, promise) => {
    console.error('unhandled promise rejection:', { // eslint-disable-line no-console
        error,
        promise,
    });
});

app.use(koaMount('/healthcare', healthcare));

// XmlHttpRequest shim for IE
app.use(xdomainRoute);

// Security headers
app.use(koaHelmet());
app.use(koaHelmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } }));
app.use(koaHelmet.frameguard('deny'));
app.use(koaCors({
    credentials: true,
    exposeHeaders: [
        'Authorization',
        'Content-Disposition',
        'Content-Type',
        'X-Entities',
    ],
    allowHeaders: [
        'Authorization',
        'Content-Disposition',
        'Content-Type',
        'X-Entities',
    ],
    allowMethods: [
        'DELETE',
        'GET',
        'POST',
        'PUT',
    ],
    origin: ctx => {
        const origin = ctx.get('origin');

        if (!!origin.length && config.apps.api.allowedOrigins.indexOf(origin) === -1) {
            return false;
        }

        return origin;
    },
}));

// DB connection
app.use(connectToDbMiddleware(null /* dbClient */, appLogger, config.apps.api.db));

if (env !== 'development') {
    // gzip compression
    app.use(compress());
}

app.use(koaBodyParser());

app.use(koaMount('/api', api));
app.use(koaMount('/admin', admin));

if (!module.parent || module.parent.filename.indexOf('api/index.js') !== -1) {
    app.listen(port);
    appLogger.info(`API server listening on port ${port}`);
    appLogger.info('Press CTRL+C to stop server');
}

export default app;
