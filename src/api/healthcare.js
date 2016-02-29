import config from 'config';
import koa from 'koa';
import koaRoute from 'koa-route';
import methodFilter from './lib/middlewares/methodFilter';
import fetch from 'isomorphic-fetch';
import dbClient from './lib/db/client';

import internetAccessCheck from './healthcare/internet';
import dbCheck from './healthcare/db';
import apiCheck from './healthcare/api';
import buildCheckResult from './healthcare/buildCheckResult';

const app = koa();

app.use(methodFilter(['GET']));
app.use(koaRoute.get('/', function* primaryEntryPoint() {
    let internetAccess;
    let db;
    let api;

    try {
        internetAccess = yield internetAccessCheck(config.apps.api.healthcare, fetch);
    } catch (err) {
        internetAccess = buildCheckResult(false, err.message);
    }

    try {
        db = yield dbCheck(config.apps.api.db, dbClient);
    } catch (err) {
        db = buildCheckResult(false, err.message);
    }

    try {
        api = yield apiCheck(config.apps.api.healthcare, fetch);
    } catch (err) {
        api = buildCheckResult(false, err.message);
    }

    this.status = internetAccess.valid && db.valid && api.valid ? 200 : 500;
    this.body = {
        internetAccess: internetAccess.message,
        db: db.message,
        api: api.message,
    };
}));

export default app;
