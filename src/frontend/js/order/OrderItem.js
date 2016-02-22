import React, { PropTypes } from 'react';
import numeral from 'numeral';
import moment from 'moment';
import { Link } from 'react-router';
import OrderStatusBadge from './OrderStatusBadge';

const OrderItem = ({id, reference, date, total, status }) => (
    <Link to={`/orders/${id}`} className="list-group-item">
        <OrderStatusBadge status={status} />
        <span className="label label-default pull-xs-right">{numeral(total).format('$0.00')}</span>
        <h4 className="list-group-item-heading">{reference} - <span className="text-muted">{moment(date).format('L')}</span></h4>
    </Link>
);

OrderItem.propTypes = {
    customer_id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    reference: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
};

export default OrderItem;
