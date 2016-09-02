import React, { PropTypes } from 'react';
import classNames from 'classnames';

const SubmitButton = ({ children, error, submitting }) => (
    <button
        type="submit"
        className={classNames('btn btn-lg btn-primary', {
            'btn-danger': error,
        })}
        disabled={submitting}
    >
        {children}
    </button>
);

SubmitButton.propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.any,
    submitting: PropTypes.bool.isRequired,
};

export default SubmitButton;
