import queriesFactory from '../lib/db/queries/index';

export default client => {
    const tableName = 'users';
    const exposedFields = [
        'id',
        'email',
        'password',
    ];

    const queries = queriesFactory(client, tableName, exposedFields);

    queries.findByEmail = function* (email) {
        const sql = `
            SELECT ${exposedFields}
            FROM ${tableName}
            WHERE LOWER(email) = LOWER($email)
            LIMIT 1
        `;

        const results = yield client.query_(sql, { email });
        return results.rowCount ? results.rows[0] : null;
    };

    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
