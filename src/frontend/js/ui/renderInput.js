import classNames from 'classnames';
import React from 'react';
import FormGroup from '../ui/FormGroup';

export default (id, label) => (field) => {
    const { meta: { touched, error } } = field;

    return (
        <FormGroup key={field.name} field={field}>
            <label className="col-form-label" htmlFor={id}>{label}</label>
            <input
                {...{ ...field.input, id }}
                className={classNames('form-control input-lg', {
                    'form-control-danger': touched && error && error.length > 0,
                    'form-control-success': touched && (!error || error.length === 0),
                })}
                type={field.type}
            />
        </FormGroup>
    );
};
