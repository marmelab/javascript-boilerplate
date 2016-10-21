import orderQueries from './orderQueries';
import orderProductsModel from '../order-products/orderProductModel';

export const OrderStatus = {
    pending: 'pending',
    sent: 'sent',
    cancelled: 'cancelled',
};

function orderModel(client) {
    const orderClient = client.link(orderModel.queries);
    const orderProductsClient = orderProductsModel(client);

    const selectByUserId = async userId => await orderClient.selectByUserId(null, null, { customer_id: userId });

    const selectOne = async ({ id }) => {
        const order = await orderClient.selectOne({ id });
        order.products = await orderProductsClient.selectByOrderId(id);

        return order;
    };

    const insertOne = async data => {
        await client.begin();

        try {
            const result = await orderClient.insertOne({
                customer_id: data.customer_id,
                date: data.date,
                reference: data.reference,
                status: data.status,
                total: data.total,
            });

            const orderProducts = data.products
            .map(product => Object.assign({}, product, { order_id: data.id, product_id: product.id }));

            if (orderProducts.length > 0) {
                await orderProductsClient.batchInsert(orderProducts);
            }

            await client.commit();

            return result;
        } catch (error) {
            await client.rollback();
            throw error;
        }
    };

    return Object.assign({}, orderClient, {
        selectByUserId,
        selectOne,
        insertOne,
    });
}

orderModel.queries = orderQueries;

export default orderModel;
