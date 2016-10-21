import React, { PropTypes } from 'react';
import classNames from 'classnames';

const FormGroup = ({ children, field: { meta: { touched, error } } }) => (
    <div
        className={classNames('form-group', {
            'has-danger': touched && error && error.length > 0,
            'has-success': touched && (!error || error.length === 0),
        })}
    >
        {children}

        {touched && error && error.map((e, i) => <span key={i} className="form-control-feedback">{e}</span>)}
    </div>
);

FormGroup.propTypes = {
    children: PropTypes.node,
    field: PropTypes.object.isRequired,
};

export default FormGroup;
