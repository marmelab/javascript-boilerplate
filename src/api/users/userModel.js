import bcrypt from 'bcrypt';
import config from 'config';

import insertOneQuery from '../lib/db/queries/insertOne';
import batchInsertQuery from '../lib/db/queries/batchInsert';
import queriesFactory from '../lib/db/queries/index';

export default client => {
    const tableName = 'user_account';
    const exposedFields = [
        'id',
        'email',
        'password',
    ];

    const queries = queriesFactory(client, tableName, exposedFields);
    const baseInsertOne = insertOneQuery(client, tableName, exposedFields);
    const baseBatchInsert = batchInsertQuery(client, tableName, exposedFields);

    queries.insertOne = function* insertOne(user, isWhitelisted) {
        user.password = bcrypt.hashSync(user.password, config.apps.api.security.bcrypt.salt_work_factor);

        return yield baseInsertOne(user, isWhitelisted);
    };

    queries.batchInsert = function* batchInsert(users) {
        const preparedUsers = users.map(user => {
            user.password = bcrypt.hashSync(user.password, config.apps.api.security.bcrypt.salt_work_factor);

            return user;
        });

        return yield baseBatchInsert(preparedUsers);
    };

    queries.findByEmail = function* findByEmail(email) {
        const sql = `
            SELECT ${exposedFields}
            FROM ${tableName}
            WHERE LOWER(email) = LOWER($email)
            LIMIT 1`;

        const results = yield client.query_(sql, { email });
        return results.rowCount ? results.rows[0] : null;
    };

    queries.authenticate = function* authenticate(email, password) {
        const foundUser = yield this.findByEmail(email);
        if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
            return false;
        }
        return {
            id: foundUser.id,
            email: foundUser.email,
        };
    };

    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
