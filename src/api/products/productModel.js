import { crud } from 'co-postgres-queries';

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

const queriesFactory = crud(tableName, fields, ['id'], exposedFields);

export default client => {
    const queries = queriesFactory(client);

    return Object.assign({
        tableName,
        exposedFields,
    }, queries);
};
