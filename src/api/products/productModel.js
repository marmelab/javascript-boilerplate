import { crudQueries } from 'co-postgres-queries';

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

const exposedFields = ['id'].concat(fields);

const queriesFactory = crudQueries(tableName, fields, ['id'], exposedFields);

export default client => {
    const queries = client.link(queriesFactory);

    return Object.assign({
        tableName,
        exposedFields,
    }, queries);
};
