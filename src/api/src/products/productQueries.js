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

const productQueries = crudQueries(tableName, fields, ['id'], exposedFields);

export default productQueries;
