import React, { PropTypes } from 'react';

const Alert = ({ children }) => (
    <div className="alert alert-danger" role="alert">
        {children}
    </div>
);

Alert.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Alert;
