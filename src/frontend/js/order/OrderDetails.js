import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import moment from 'moment';
import numeral from 'numeral';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import OrderProductItem from './OrderProductItem';
import OrderStatusBadge from './OrderStatusBadge';
import withWindowTitle from '../app/withWindowTitle';
import OrderItemPropTypes from './propTypes';

const OrderDetails = ({ loading, order }) => {
    if (loading || !order) return <i className="fa fa-spinner fa-spin" />;

    const { reference, date, total, status, products } = order;

    return (
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
                        item={product}
                    />
                ))}
                <div className="list-group-item text-xs-right lead">
                    TOTAL: {numeral(total).format('$0.00')}
                </div>
            </div>
        </div>
    );
};

OrderDetails.propTypes = {
    loading: PropTypes.bool.isRequired,
    order: OrderItemPropTypes.order,
};

const orderQuery = gql`
    query order($id: ID!) {
        order(id: $id) {
            date
            id
            products {
                id
                product_id
                description
                image
                price
                quantity
                reference
                thumbnail
            }
            reference
            status
            total
        }
    }
`;

const titleSelector = (state, { order }) => {
    if (order) return `${order.reference} - ${moment(order.date).format('L')}`;
    return null;
};

export default compose(
    graphql(orderQuery, {
        options: ({ params: { id } }) => ({ variables: { id } }),
        props: ({ data: { loading, order } }) => ({ loading, order }),
    }),
    withWindowTitle(titleSelector),
)(OrderDetails);
