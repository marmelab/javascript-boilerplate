import { crud } from 'co-postgres-queries';

export default client => {
    const tableName = 'product';
    const fields = [
        'reference',
        'width',
        'height',
        'price',
        'thumbnail',
        'image',
        'description',
        'stock',
    ];

    const exposedFields = [
        'id',
        ...fields,
    ];

    const queries = crud(tableName, fields, ['id'], exposedFields)(client);
    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
