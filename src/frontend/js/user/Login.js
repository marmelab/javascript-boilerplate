import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { reduxForm, propTypes } from 'redux-form';
import buildSchema from 'redux-form-schema';
import HelmetTitle from '../app/HelmetTitle';
import { Link } from 'react-router';
import { login as loginAction } from './userActions';

const loginSchema = buildSchema({
    email: {
        required: true,
        type: 'email',
    },

    password: {
        required: true,
    },
});

const Login = ({ login, previousRoute, fields: { email, password }, handleSubmit, submitting, submitFailed }) => (
    <div className="container login">
        <HelmetTitle title="Login" />
        <div className="row">
            <div className="col-xs-12">
                <div className="jumbotron">
                    <h2 className="display-4">Authentication</h2>
                    <form onSubmit={handleSubmit(login.bind(null, previousRoute))}>
                        <div className={classNames('form-group', {
                            'has-error': email.touched && email.error,
                        })}>
                            <input
                                type="email"
                                className="form-control input-lg"
                                placeholder="Your email"
                                {...email}
                            />
                            {email.touched && email.error && <span className="help-block">{email.error}</span>}
                        </div>
                        <div className={classNames('form-group', {
                            'has-error': password.touched && password.error,
                        })}>
                            <input
                                type="password"
                                className="form-control input-lg"
                                placeholder="Your password"
                                {...password}
                            />
                            {password.touched && password.error && <span className="help-block">{password.error}</span>}
                        </div>
                        <button type="submit" className={classNames('btn btn-lg btn-primary', {
                            'btn-danger': submitFailed,
                        })} disabled={submitting}>
                            Login
                        </button>
                        <Link to="/sign-up" className="btn btn-lg btn-link">Sign-up</Link>
                        <Link to="/forgot-password" className="btn btn-lg btn-link">Forgot your password ?</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

Login.propTypes = {
    ...propTypes,
    login: PropTypes.func.isRequired,
    previousRoute: PropTypes.string,
};

export default reduxForm({
    form: 'login',
    fields: loginSchema.fields,
    validate: loginSchema.validate,
    destroyOnUnmount: false,
},
state => ({
    previousRoute: state.routing.location.state.nextPathname,
}), {
    login: loginAction,
})(Login);
