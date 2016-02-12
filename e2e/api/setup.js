import { assert } from 'chai';
import config from 'config';
import dbClient from '../../src/api/lib/db/client';
import fixturesFactory from '../lib/fixturesLoader';
import request from '../lib/request';

before(function* setGlobalForTest() {
    global.db = yield dbClient(config.apps.api.db);
    global.fixtureLoader = fixturesFactory(global.db.client);
    global.assert = assert;
    global.request = request;
});

after(function* closeDb() {
    global.db.done();
});
