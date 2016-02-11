import queriesFactory from '../lib/db/queries/index';

export default client => {
    const tableName = 'orders';
    const exposedFields = [
        'id',
        'reference',
        'date',
        'customer_id',
        'total',
        'status',
    ];

    const queries = queriesFactory(client, tableName, exposedFields);

    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
