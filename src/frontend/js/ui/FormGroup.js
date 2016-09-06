import React, { PropTypes } from 'react';
import classNames from 'classnames';

const FormGroup = ({ children, field }) => (
    <div
        className={classNames('form-group', {
            'has-error': field.meta.touched && field.meta.error && field.meta.error.length > 0,
        })}
    >
        {children}

        {field.meta.touched && field.meta.error && field.meta.error.map(error => (
            <span className="help-block">{error}</span>
        ))}
    </div>
);

FormGroup.propTypes = {
    children: PropTypes.node,
    field: PropTypes.object.isRequired,
};

export default FormGroup;
