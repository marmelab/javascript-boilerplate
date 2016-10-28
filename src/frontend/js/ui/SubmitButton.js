import React, { PropTypes } from 'react';
import classnames from 'classnames';

const SubmitButton = ({ children, className, error, submitting }) => (
    <button
        type="submit"
        className={classnames('btn btn-primary', className, {
            'btn-danger': error,
        })}
        disabled={submitting}
    >
        {children}
    </button>
);

SubmitButton.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.node,
    error: PropTypes.any, // eslint-disable-line
    submitting: PropTypes.bool.isRequired,
};

export default SubmitButton;

export const BigSubmitButton = ({ className, ...props }) => (
    <SubmitButton
        className={classnames('btn-lg', className)}
        {...props}
    />
);

BigSubmitButton.propTypes = {
    className: PropTypes.node,
};
