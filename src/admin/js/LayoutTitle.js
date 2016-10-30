/* globals APP_NAME */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LayoutTitle = ({ subtitle }) => (
    <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
        {`${APP_NAME} - Administration`}{subtitle && <span> - {subtitle}</span>}
    </Link>
);

LayoutTitle.propTypes = {
    subtitle: PropTypes.string,
};

export default LayoutTitle;
