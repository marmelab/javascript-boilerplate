/* eslint no-param-reassign: off */
import config from 'config';
import Koa from 'koa';
import koaRoute from 'koa-route';
import fetch from 'isomorphic-fetch';
import { PgPool } from 'co-postgres-queries';

import methodFilter from './lib/middlewares/methodFilter';
import internetAccessCheck from './healthcare/internet';
import dbCheck from './healthcare/db';
import apiCheck from './healthcare/api';

const app = new Koa();

app.use(methodFilter(['GET']));
app.use(koaRoute.get('/', async (ctx) => {
    let internetAccess;
    let db;
    let api;

    try {
        internetAccess = await internetAccessCheck(config.apps.api.healthcare, fetch);
    } catch (err) {
        internetAccess = false;
    }

    try {
        db = await dbCheck(config.apps.api.db, PgPool);
    } catch (err) {
        db = false;
    }

    try {
        api = await apiCheck(config.apps.api.healthcare, fetch);
    } catch (err) {
        api = false;
    }

    ctx.status = internetAccess && db && api ? 200 : 500;
    ctx.body = {
        internetAccess: internetAccess ? 'OK' : 'KO',
        db: db ? 'OK' : 'KO',
        api: api ? 'OK' : 'KO',
    };
}));

export default app;
