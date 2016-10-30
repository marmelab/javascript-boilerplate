import orderProductQueries from './orderProductQueries';

export const OrderStatus = {
    pending: 'pending',
    sent: 'sent',
    cancelled: 'cancelled',
};

function orderProductModel(client) {
    const model = client.link(orderProductModel.queries);

    const selectByOrderId = async order_id => await model.selectByOrderId(null, null, { order_id });

    const selectByProductId = async product_id => await model.selectByOrderId(null, null, { product_id });

    return Object.assign({}, model, {
        selectByOrderId,
        selectByProductId,
    });
}

orderProductModel.queries = orderProductQueries;

export default orderProductModel;
