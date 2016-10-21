/* eslint func-names: off */
import { crud } from 'co-postgres-queries';

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

const crudQueries = crud(tableName, exposedFields, exposedFields);

export default (client) => {
    const queries = crudQueries(client);

    queries.selectByOrderId = async (orderId) => {
        const sql = `
            SELECT ${exposedFields.join(', ')}
            FROM ${tableName}
            WHERE order_id = $orderId`;

        return await client.query({ sql, parameters: { orderId } });
    };

    return Object.assign({
        tableName,
        exposedFields,
    }, queries);
};
