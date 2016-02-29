import co from 'co';
import queriesFactory from '../lib/db/queries/index';
import insertOneQuery from '../lib/db/queries/insertOne';

export const OrderStatus = {
    pending: 'pending',
    sent: 'sent',
    cancelled: 'cancelled',
};

export default client => {
    const tableName = 'user_order';
    const exposedFields = [
        'id',
        'reference',
        'date',
        'customer_id',
        'total',
        'status',
    ];

    const queries = queriesFactory(client, tableName, exposedFields);

    queries.selectByUserId = function* selectByUserId(userId) {
        const sql = `
            SELECT ${exposedFields}
            FROM ${tableName}
            WHERE customer_id = $userId`;

        const orders = yield client.query_(sql, { userId });

        return orders.rows;
    };

    const selectOneById = queries.selectOneById;

    queries.selectOneById = function* extendedSelectOneById(id) {
        const order = yield selectOneById(id);

        const sql = `
            SELECT
                order_id,
                product_id,
                quantity,
                reference,
                width,
                height,
                price,
                thumbnail,
                image,
                description
            FROM order_product
            WHERE order_id = $orderId`;

        const orderProducts = yield client.query_(sql, { orderId: id });

        order.products = orderProducts.rows;

        return order;
    };

    const insertOne = queries.insertOne;
    const insertOneOrderProduct = insertOneQuery(client, 'order_product', [
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
    ]);

    queries.insertOne = function* insertOneWithProducts(data) {
        const result = yield insertOne({
            customer_id: data.customer_id,
            date: data.date,
            reference: data.reference,
            status: data.status,
            total: data.total,
        });

        const insertOrderProduct = co.wrap(function* insertOrderProduct(order, orderProduct) {
            console.log({order, orderProduct});
            const {
                quantity,
                reference,
                width,
                height,
                price,
                thumbnail,
                image,
                description,
            } = orderProduct;

            return yield insertOneOrderProduct({
                order_id: order.id,
                product_id: orderProduct.id,
                quantity,
                reference,
                width,
                height,
                price,
                thumbnail,
                image,
                description,
            });
        });

        result.products = yield data.products.map(op => insertOrderProduct(result, op));

        return result;
    };

    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
