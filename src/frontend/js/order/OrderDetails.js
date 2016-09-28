import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import orderActions from './actions';
import OrderItem from './OrderItem';
import OrderProductItem from './OrderProductItem';
import OrderStatusBadge from './OrderStatusBadge';
import { getOrderById } from './reducer';
import withFetchingOnMount from '../../../common-client/fetch/withFetchingOnMount';
import withWindowTitle from '../app/withWindowTitle';

const OrderDetails = ({ order: { reference, date, total, status, products } }) => (
    <div className="shopping-cart list-group">
        <h2>
            <OrderStatusBadge status={status} />
            #{reference} - {moment(date).format('L')}
        </h2>
        <div className="list-group">
            {products.map((product, index) => (
                <OrderProductItem
                    key={index}
                    id={product.product_id}
                    {...product}
                />
            ))}
            <div className="list-group-item text-xs-right lead">
                TOTAL: {numeral(total).format('$0.00')}
            </div>
        </div>
    </div>
);

OrderDetails.propTypes = {
    order: PropTypes.shape(OrderItem.propTypes),
};

const mapStateToProps = state => ({ order: state.order.item });

const dataSelector = (state, ownProps) => {
    const orderId = parseInt(ownProps.params.id, 10);
    return state.order.item || getOrderById(state, orderId);
};
const paramsSelector = (state, ownProps) => ownProps.routeParams.id;
const loadingSelector = state => state.order.loading;
const titleSelector = (state, ownProps) => {
    const orderId = parseInt(ownProps.routeParams.id, 10);
    const order = state.order.item || getOrderById(state, orderId);

    if (order) return `Order ${order.reference} - ${moment(order.date).format('L')}`;

    return null;
};

export default compose(
    withFetchingOnMount(orderActions.item.request, { dataSelector, paramsSelector, loadingSelector }),
    withWindowTitle(titleSelector),
    connect(mapStateToProps),
)(OrderDetails);
