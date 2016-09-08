import { assert } from 'chai';
import config from 'config';
import { PgPool } from 'co-postgres-queries';
import fixturesFactory from '../lib/fixturesLoader';
import request from '../lib/request';

before(function* setGlobalForTest() {
    global.pool = new PgPool(config.apps.api.db);
    global.db = yield global.pool.connect();
    global.fixtureLoader = fixturesFactory(global.db);
    global.assert = assert;
    global.request = request;
});

after(() => {
    global.db.release();
    global.pool.end();
});
