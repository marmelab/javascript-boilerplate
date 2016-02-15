#!./node_modules/babel/bin/babel-node.js

import co from 'co';
import config from 'config';
import dbClient from '../src/api/lib/db/client';
import fixturesFactory from '../e2e/lib/fixturesLoader';

co(function* () {
    const db = yield dbClient(config.apps.api.db);
    const fixtureLoader = fixturesFactory(db.client);
    yield fixtureLoader.removeAllFixtures();
    yield fixtureLoader.loadDefaultFixtures();
}).then(() => {
    console.log('Fixtures successfully loaded!');
    process.exit(0);
}).catch(error => {
    console.error(error, { trace: error.stack });
    process.exit(1);
});
