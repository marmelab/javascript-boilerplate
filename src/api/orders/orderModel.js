import { crudQueries } from 'co-postgres-queries';
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

const queriesFactory = crudQueries(tableName, fields, ['id'], exposedFields);

export default client => {
    const orderClient = client.link(queriesFactory);
    const orderProductsClient = orderProductsModel(client);

    orderClient.selectByUserId = async userId => {
        const sql = `
            SELECT ${exposedFields}
            FROM ${tableName}
            WHERE customer_id = $userId`;

        return await client.query({ sql, parameters: { userId } });
    };

    const selectOne = orderClient.selectOne;
    orderClient.selectOne = async ({ id }) => {
        const order = await selectOne({ id });
        order.products = await orderProductsClient.selectByOrderId(id);

        return order;
    };

    const baseInsertOne = orderClient.insertOne;
    orderClient.insertOne = async data => {
        await client.begin();

        try {
            const result = await baseInsertOne({
                customer_id: data.customer_id,
                date: data.date,
                reference: data.reference,
                status: data.status,
                total: data.total,
            });

            const orderProducts = data.products
            .map(product => Object.assign({}, product, { order_id: data.id, product_id: product.id }));

            await orderProductsClient.batchInsert(orderProducts);

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
    }, orderClient);
};
