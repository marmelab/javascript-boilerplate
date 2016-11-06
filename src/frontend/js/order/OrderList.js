import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import OrderItem from './OrderItem';
import withLoading from '../app/withLoading';
import withWindowTitle from '../app/withWindowTitle';
import OrderItemPropType from './propTypes';

const orderListQuery = gql`
query orders {
    orders {
        date
        id
        reference
        status
        total
    }
}
`;

const OrderList = ({ orders }) => (
    <div className="row orders-list">
        <div className="col-xs-12">
            <div className="list-group">
                {orders.map(order => (
                    <OrderItem key={order.id} order={order} />
                ))}
            </div>
        </div>
    </div>
);

OrderList.propTypes = {
    orders: PropTypes.arrayOf(OrderItemPropType.order),
};

export default compose(
    withWindowTitle('Orders'),
    graphql(orderListQuery, {
        props: ({ data: { loading, orders } }) => ({ loading, orders }),
    }),
    withLoading((state, { loading, orders }) => loading || !orders)
)(OrderList);
