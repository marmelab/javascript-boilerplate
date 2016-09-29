import React, { PropTypes } from 'react';
import classNames from 'classnames';

const getLabel = status => ({
    'label-info': status === 'pending',
    'label-success': status === 'sent',
    'label-danger': status === 'refused',
});

const OrderStatusBadge = ({ status }) => (
    <span className={classNames('label label-default pull-xs-right', getLabel(status))}>
        {status}
    </span>
);

OrderStatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
};

export default OrderStatusBadge;
