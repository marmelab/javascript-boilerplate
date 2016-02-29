import React, { PropTypes } from 'react';
import classNames from 'classnames';

const OrderStatusBadge = ({status }) => (
    <span className={classNames('label label-default pull-xs-right', {
        'label-info': status === 'pending',
        'label-success': status === 'sent',
        'label-danger': status === 'refused',
    })}>{status}</span>
);

OrderStatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
};

export default OrderStatusBadge;
