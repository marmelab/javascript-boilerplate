#!./node_modules/babel/bin/babel-node.js

import co from 'co';
import config from 'config';
import { PgPool } from 'co-postgres-queries';
import fixturesFactory from '../e2e/lib/fixturesLoader';

co(function* () {
    const db = new PgPool(config.apps.api.db);
    const fixtureLoader = fixturesFactory(db);
    yield fixtureLoader.removeAllFixtures();
    yield fixtureLoader.loadDefaultFixtures();
}).then(() => {
    console.log('Fixtures successfully loaded!');
    process.exit(0);
}).catch(error => {
    console.error(error, { trace: error.stack });
    process.exit(1);
});
