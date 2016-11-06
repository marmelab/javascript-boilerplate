import React, { PropTypes } from 'react';
import classNames from 'classnames';

const getLabel = status => ({
    'tag-info': status === 'pending',
    'tag-success': status === 'sent',
    'tag-danger': status === 'refused',
});

const OrderStatusBadge = ({ status }) => (
    <span className={classNames('tag tag-default float-xs-right', getLabel(status))}>
        {status}
    </span>
);

OrderStatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
};

export default OrderStatusBadge;
