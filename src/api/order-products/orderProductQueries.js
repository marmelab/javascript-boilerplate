import { crudQueries, selectPageQuery } from 'co-postgres-queries';

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

const selectByOrderId = selectPageQuery(tableName, ['order_id'], exposedFields);
const selectByProductId = selectPageQuery(tableName, ['product_id'], exposedFields);

export default Object.assign({
    selectByOrderId,
    selectByProductId,
}, orderProductsQueries);
