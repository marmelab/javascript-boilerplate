/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import co from 'co';
import config from 'config';
import { PgPool } from 'co-postgres-queries';
import userRepositoryFactory from '../src/api/users/userModel';

const args = process.argv.slice(2);

co(function* () {
    const pool = new PgPool(config.apps.api.db);
    const userRepository = userRepositoryFactory(pool);

    const user = yield userRepository.insertOne({
        email: args[1],
        password: args[2],
    });

    pool.end();

    console.log('\n');
    console.log(user);
    process.exit();
}).catch((err) => {
    console.error(err.message);
    process.exit();
});
