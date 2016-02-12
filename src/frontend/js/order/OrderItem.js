import React, { PropTypes } from 'react';
import numeral from 'numeral';
import moment from 'moment';
import classNames from 'classnames';
import { Link } from 'react-router';

const OrderItem = ({id, reference, date, total, status }) => (
    <Link to={`/orders/${id}`} className="list-group-item">
        <span className={classNames('label label-default pull-xs-right', {
            'label-info': status === 'pending',
            'label-success': status === 'sent',
            'label-danger': status === 'refused',
        })}>{status}</span>
        <span className="label label-default pull-xs-right">{numeral(total).format('$0.00')}</span>
        <h4 className="list-group-item-heading">{reference} - <span className="text-muted">{moment(date).format('L')}</span></h4>
        <p className="list-group-item-text">

        </p>
    </Link>
);

OrderItem.propTypes = {
    customer_id: PropTypes.number.isRequired,
    date: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
};

export default OrderItem;
