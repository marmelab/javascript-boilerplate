import queriesFactory from '../lib/db/queries/index';

export default client => {
    const tableName = 'products';
    const exposedFields = [
        'id',
        'reference',
        'width',
        'height',
        'price',
        'thumbnail',
        'image',
        'description',
        'stock',
    ];

    const queries = queriesFactory(client, tableName, exposedFields);

    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
