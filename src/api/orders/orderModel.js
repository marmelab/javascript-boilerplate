import queriesFactory from '../lib/db/queries/index';

export default client => {
    const tableName = 'user_order';
    const exposedFields = [
        'id',
        'reference',
        'date',
        'customer_id',
        'total',
        'status',
    ];

    const queries = queriesFactory(client, tableName, exposedFields);

    queries.selectByUserId = function* selectByUserId(userId) {
        const sql = `
            SELECT ${exposedFields}
            FROM ${tableName}
            WHERE customer_id = $userId`;

        const orders = yield client.query_(sql, { userId });

        return orders.rows;
    };

    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
