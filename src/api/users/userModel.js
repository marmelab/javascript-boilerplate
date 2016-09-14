import bcrypt from 'bcrypt';
import config from 'config';

import { crud } from 'co-postgres-queries';

const tableName = 'user_account';

const fields = [
    'email',
    'password',
];
const exposedFields = [
    'id',
    ...fields,
];

const queriesFactory = crud(tableName, fields, ['id'], exposedFields);

const hashUserPassword = user => Object.assign({}, user, {
    password: bcrypt.hashSync(user.password, config.apps.api.security.bcrypt.salt_work_factor),
});

export default client => {
    const queries = queriesFactory(client);

    const baseInsertOne = queries.insertOne;
    const baseBatchInsert = queries.batchInsert;

    queries.insertOne = async (user, isWhitelisted) => await baseInsertOne(hashUserPassword(user), isWhitelisted);

    queries.batchInsert = async users => {
        const preparedUsers = users.map(hashUserPassword);

        return await baseBatchInsert(preparedUsers);
    };

    queries.findByEmail = async email => {
        const sql = `
            SELECT ${exposedFields}
            FROM ${tableName}
            WHERE LOWER(email) = LOWER($email)
            LIMIT 1`;

        const results = await client.query({ sql, parameters: { email } });
        return results.length ? results[0] : null;
    };

    queries.authenticate = async (email, password) => {
        const foundUser = await queries.findByEmail(email);
        if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
            return false;
        }
        return {
            id: foundUser.id,
            email: foundUser.email,
        };
    };

    return Object.assign({
        tableName,
        exposedFields,
    }, queries);
};
