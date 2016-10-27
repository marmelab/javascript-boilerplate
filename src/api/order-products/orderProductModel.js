import orderProductQueries from './orderProductQueries';

export const OrderStatus = {
    pending: 'pending',
    sent: 'sent',
    cancelled: 'cancelled',
};

function orderProductModel(client) {
    const orderProductModelClient = client.link(orderProductModel.queries);

    const selectByOrderId = order_id => orderProductModelClient.selectPage(1, 0, { order_id });

    const selectByProductId = product_id => orderProductModelClient.selectPage(1, 0, { product_id });

    return Object.assign({}, orderProductModelClient, {
        selectByOrderId,
        selectByProductId,
    });
}

orderProductModel.queries = orderProductQueries;

export default orderProductModel;
