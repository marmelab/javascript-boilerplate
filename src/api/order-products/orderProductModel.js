/* eslint func-names: off */
import { crudQueries } from 'co-postgres-queries';

export const OrderStatus = {
    pending: 'pending',
    sent: 'sent',
    cancelled: 'cancelled',
};
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

export default client => {
    const orderProductModelClient = client.link(orderProductsQueries);

    orderProductModelClient.selectByOrderId = (orderId) => orderProductModelClient.selectPage(1, 0, { orderId });

    return Object.assign({
        tableName,
        exposedFields,
    }, orderProductModelClient);
};
