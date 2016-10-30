import { crudQueries } from 'co-postgres-queries';

const tableName = 'product';
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

const productQueries = crudQueries(tableName, exposedFields, ['id'], exposedFields);

export default productQueries;
