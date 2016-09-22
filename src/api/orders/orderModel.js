import co from 'co';
import { crud } from 'co-postgres-queries';
import orderProductsModel from '../order-products/orderProductModel';

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

const exposedFields = ['id'].concat(fields);

const queriesFactory = crud(tableName, fields, ['id'], exposedFields);

export default client => {
    const queries = queriesFactory(client);
    const orderProductsQueries = orderProductsModel(client);

    queries.selectByUserId = async userId => {
        const sql = `
            SELECT ${exposedFields}
            FROM ${tableName}
            WHERE customer_id = $userId`;

        return await client.query({ sql, parameters: { userId } });
    };

    const selectOne = queries.selectOne;
    queries.selectOne = async ({ id }) => {
        const order = await selectOne({ id });
        order.products = await orderProductsQueries.selectByOrderId(id);

        return order;
    };

    const baseInsertOne = queries.insertOne;
    queries.insertOne = async data => {
        await client.begin();

        try {
            const result = await baseInsertOne({
                customer_id: data.customer_id,
                date: data.date,
                reference: data.reference,
                status: data.status,
                total: data.total,
            });

            const insertOrderProduct = async (order, orderProduct) => {
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

                return await orderProductsQueries.insertOne({
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
            };

            result.products = [];
            for (let i = 0; i < data.products.length; i++) {
                const product = data.products[i];
                const insertedProduct = await insertOrderProduct(result, product);
                result.products.push(insertedProduct);
            }

            await client.commit();
            return result;
        } catch (error) {
            await client.rollback();
            throw error;
        }
    };

    return Object.assign({
        tableName,
        exposedFields,
    }, queries);
};
