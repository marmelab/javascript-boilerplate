import co from 'co';
import { crud, insertOne } from 'co-postgres-queries';

export const OrderStatus = {
    pending: 'pending',
    sent: 'sent',
    cancelled: 'cancelled',
};

const tableName = 'user_order';
const fields = [
    'reference',
    'date',
    'customer_id',
    'total',
    'status',
];
const exposedFields = [
    'id',
    ...fields,
];

const queriesFactory = crud(tableName, fields, ['id'], exposedFields);

export default client => {
    const queries = queriesFactory(client);


    queries.selectByUserId = function* selectByUserId(userId) {
        const sql = `
            SELECT ${exposedFields}
            FROM ${tableName}
            WHERE customer_id = $userId`;

        return yield client.query({
            sql,
            parameters: { userId },
        });
    };

    const selectOne = queries.selectOne;

    queries.selectOne = function* extendedSelectOne({ id }) {
        const order = yield selectOne({ id });

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

        const orderProducts = yield client.query({
            sql,
            parameters: { orderId: id },
        });

        order.products = orderProducts;

        return order;
    };

    const insertOneOrderProduct = insertOne('order_product', [
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
    ])(client);


    const insertOneOrder = queries.insertOne;
    queries.insertOne = function* insertOneWithProducts(data) {
        yield client.begin();
        try {
            const result = yield insertOneOrder({
                customer_id: data.customer_id,
                date: data.date,
                reference: data.reference,
                status: data.status,
                total: data.total,
            });

            const insertOrderProduct = co.wrap(function* insertOrderProduct(order, orderProduct) {
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
            yield client.commit();
            return result;
        } catch (error) {
            yield client.rollback();
            throw error;
        }
    };

    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
