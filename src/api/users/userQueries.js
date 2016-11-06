import { crudQueries } from 'co-postgres-queries';

const tableName = 'user_account';

const exposedFields = [
    'id',
    'email',
    'password',
];

const userQueries = crudQueries(tableName, exposedFields, ['id'], exposedFields);

const findByEmail = (email) => {
    const sql = `
        SELECT ${exposedFields}
        FROM ${tableName}
        WHERE LOWER(email) = LOWER($email)
        LIMIT 1`;

    return { sql, parameters: { email } };
};

export default Object.assign(userQueries, { findByEmail });
