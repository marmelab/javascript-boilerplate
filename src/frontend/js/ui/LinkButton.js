import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const LinkButton = ({ children, className, ...props }) => (
    <Link
        className={classnames('btn btn-lg btn-link', className)}
        {...props}
    >
        {children}
    </Link>
);

LinkButton.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default LinkButton;

export const BigLinkButton = ({ className, ...props }) => (
    <LinkButton
        className={classnames('btn-lg', className)}
        {...props}
    />
);

BigLinkButton.propTypes = {
    className: PropTypes.string,
};
