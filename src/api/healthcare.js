import config from 'config';
import koa from 'koa';
import koaRoute from 'koa-route';
import methodFilter from './lib/middlewares/methodFilter';
import fetch from 'isomorphic-fetch';
import { PgPool } from 'co-postgres-queries';

import internetAccessCheck from './healthcare/internet';
import dbCheck from './healthcare/db';
import apiCheck from './healthcare/api';

const app = koa();

app.use(methodFilter(['GET']));
app.use(koaRoute.get('/', function* primaryEntryPoint() {
    let internetAccess;
    let db;
    let api;

    try {
        internetAccess = yield internetAccessCheck(config.apps.api.healthcare, fetch);
    } catch (err) {
        internetAccess = false;
    }

    try {
        db = yield dbCheck(config.apps.api.db, PgPool);
    } catch (err) {
        db = false;
    }

    try {
        api = yield apiCheck(config.apps.api.healthcare, fetch);
    } catch (err) {
        api = false;
    }

    this.status = internetAccess && db && api ? 200 : 500;
    this.body = {
        internetAccess: internetAccess ? 'OK' : 'KO',
        db: db ? 'OK' : 'KO',
        api: api ? 'OK' : 'KO',
    };
}));

export default app;
