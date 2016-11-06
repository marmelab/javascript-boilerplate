import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import { Link } from 'react-router';
import OrderStatusBadge from './OrderStatusBadge';
import OrderItemPropType from './propTypes';

const OrderItem = ({ order: { id, reference, date, total, status } }) => (
    <Link to={`/orders/${id}`} className="list-group-item">
        <OrderStatusBadge status={status} />
        <span className="tag tag-default float-xs-right">
            {numeral(total).format('$0.00')}
        </span>
        <h4 className="list-group-item-heading">
            {reference} - <span className="text-muted">{moment(date).format('L')}</span>
        </h4>
    </Link>
);

OrderItem.propTypes = {
    order: OrderItemPropType.order.isRequired,
};

export default OrderItem;
