import orderProductQueries from './orderProductQueries';

export const OrderStatus = {
    pending: 'pending',
    sent: 'sent',
    cancelled: 'cancelled',
};

function orderProductModel(client) {
    const orderProductModelClient = client.link(orderProductModel.queries);

    const selectByOrderId = (orderId) => orderProductModelClient.selectPage(1, 0, { orderId });

    return Object.assign({}, orderProductModelClient, {
        selectByOrderId,
    });
}

orderProductModel.queries = orderProductQueries;

export default orderProductModel;
