import uuid from 'uuid';
import orderQueries from './orderQueries';
import orderProductsQueries from '../order-products/orderProductQueries';
import productQueries from '../products/productQueries';

import { OrderStatusPending } from '../../common/OrderStatus';

export const selectByUserId = orderClient => userId => orderClient.selectByUserId(null, null, { customer_id: userId });

export const selectOne = (orderClient, orderProductsClient) =>
    async ({ id }) => {
        const order = await orderClient.selectOne({ id });
        order.products = await orderProductsClient.selectByOrderId(id);

        return order;
    };

export const sanitizeProduct = productClient => async (product) => {
    const productFromDb = await productClient.selectOneById({ id: product.id });
    return Object.assign({}, product, productFromDb);
};

export const saveNewOrder = (client, orderClient, orderProductsClient, productClient) =>
    async (customerId, products) => {
        const sanitizedProducts = await Promise.all(products.map(p => sanitizeProduct(productClient)(p)));
        const total = sanitizedProducts.reduce((t, p) => t + (p.price * (p.quantity || 1)), 0);
        await client.begin();

        try {
            const order = await orderClient.insertOne({
                customer_id: customerId,
                date: new Date(),
                products: sanitizedProducts,
                reference: uuid.v1(),
                status: OrderStatusPending,
                total,
            });

            const orderProducts = sanitizedProducts.map(product => Object.assign({}, product, {
                order_id: order.id,
                product_id: product.id,
            }));

            if (orderProducts.length > 0) {
                await orderProductsClient.batchInsert(orderProducts);
            }

            await client.commit();

            return await selectOne(orderClient, orderProductsClient)({ id: order.id });
        } catch (error) {
            await client.rollback();
            throw error;
        }
    };

export default function orderRepository(client) {
    const orderClient = client.link(orderQueries);
    const orderProductsClient = client.link(orderProductsQueries);
    const productClient = client.link(productQueries);

    return Object.assign({}, orderClient, {
        saveNewOrder: saveNewOrder(client, orderClient, orderProductsClient, productClient),
        selectByUserId: selectByUserId(orderClient),
        selectOne: selectOne(orderClient, orderProductsClient),
    });
}
