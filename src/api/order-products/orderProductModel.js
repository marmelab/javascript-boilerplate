/* eslint func-names: off */
import queriesFactory from '../lib/db/queries/index';

export const OrderStatus = {
    pending: 'pending',
    sent: 'sent',
    cancelled: 'cancelled',
};

export default client => {
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

    const queries = queriesFactory(client, tableName, exposedFields);

    queries.selectByOrderId = function* (orderId) {
        const sql = `
            SELECT ${exposedFields.join(', ')}
            FROM ${tableName}
            WHERE order_id = $orderId`;

        return yield client.query_(sql, { orderId });
    };

    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
