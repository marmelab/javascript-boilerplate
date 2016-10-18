import bcrypt from 'bcrypt';
import config from 'config';

import { crudQueries } from 'co-postgres-queries';

const tableName = 'user_account';

const fields = [
    'email',
    'password',
];

const exposedFields = ['id'].concat(fields);

const queriesFactory = crudQueries(tableName, fields, ['id'], exposedFields);

const hashUserPassword = user => Object.assign({}, user, {
    password: bcrypt.hashSync(user.password, config.apps.api.security.bcrypt.salt_work_factor),
});

export default client => {
    const userClient = client.link(queriesFactory);

    const insertOne = async (user, isWhitelisted) => await userClient.insertOne(hashUserPassword(user), isWhitelisted);

    const batchInsert = async users => {
        const preparedUsers = users.map(hashUserPassword);

        return await userClient.batchInsert(preparedUsers);
    };

    const findByEmail = async email => {
        const sql = `
            SELECT ${exposedFields}
            FROM ${tableName}
            WHERE LOWER(email) = LOWER($email)
            LIMIT 1`;

        const results = await client.query({ sql, parameters: { email } });
        return results.length ? results[0] : null;
    };

    const authenticate = async (email, password) => {
        const foundUser = await findByEmail(email);

        if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
            return false;
        }
        return {
            id: foundUser.id,
            email: foundUser.email,
        };
    };

    return Object.assign({}, userClient, {
        tableName,
        exposedFields,
        insertOne,
        batchInsert,
        findByEmail,
        authenticate,
    });
};
