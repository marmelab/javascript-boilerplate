import { crudQueries } from 'co-postgres-queries';

const tableName = 'order_product';
const exposedFields = [
    'id',
    'order_id',
    'product_id',
    'quantity',
    'reference',
    'width',
    'height',
    'price',
    'thumbnail',
    'image',
    'description',
];

const orderProductsQueries = crudQueries(tableName, exposedFields, exposedFields);

export default orderProductsQueries;
