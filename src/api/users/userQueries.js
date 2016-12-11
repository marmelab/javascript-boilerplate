import { crudQueries, selectOneQuery } from 'co-postgres-queries';

const tableName = 'user_account';

const fields = [
    'email',
    'password',
];

const exposedFields = ['id'].concat(fields);

const userQueries = crudQueries(tableName, fields, ['id'], exposedFields);

const findByEmail = (email) => {
    const sql = `
        SELECT ${exposedFields}
        FROM ${tableName}
        WHERE LOWER(email) = LOWER($email)
        LIMIT 1`;

    return { sql, parameters: { email } };
};

const selectOneById = selectOneQuery(tableName, ['id'], exposedFields);

export default Object.assign(userQueries, { findByEmail, selectOneById });
