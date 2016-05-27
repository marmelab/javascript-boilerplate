import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, propTypes } from 'redux-form';
import buildSchema from 'redux-form-schema';

import HelmetTitle from '../app/HelmetTitle';
import { signIn as signInActions } from './userActions';

const signInSchema = buildSchema({
    email: {
        required: true,
        type: 'email',
    },
    password: {
        required: true,
    },
});

const SignIn = ({
    /* eslint-disable react/prop-types */
    signInError,
    signIn,
    previousRoute,
    fields: { email, password },
    handleSubmit,
    submitting,
    submitFailed,
    /* eslint-enable react/prop-types */
}) => (
    <div className="container signIn">
        <HelmetTitle title="Sign in" />
        <div className="row">
            <div className="col-xs-12">
                <div className="jumbotron">
                    <h2 className="display-4">Sign in</h2>
                    {signInError &&
                        <div className="alert alert-danger" role="alert">
                            {signInError.message}
                        </div>
                    }
                    <form onSubmit={handleSubmit(signIn.bind(null, previousRoute))}>
                        <div className={classNames('form-group', {
                            'has-error': email.touched && email.error,
                        })}
                        >
                            <input
                                type="email"
                                className="form-control input-lg"
                                placeholder="Your email"
                                {...email}
                            />
                            {email.touched && email.error &&
                                <span className="help-block">{email.error}</span>
                            }
                        </div>
                        <div className={classNames('form-group', {
                            'has-error': password.touched && password.error,
                        })}
                        >
                            <input
                                type="password"
                                className="form-control input-lg"
                                placeholder="Your password"
                                {...password}
                            />
                            {password.touched && password.error &&
                                <span className="help-block">{password.error}</span>
                            }
                        </div>
                        <button type="submit" className={classNames('btn btn-lg btn-primary', {
                            'btn-danger': signInError || submitFailed,
                        })} disabled={submitting}
                        >
                            Sign in
                        </button>
                        <Link
                            className="btn btn-lg btn-link"
                            to={{ pathname: '/sign-up', state: { nextPathname: previousRoute } }}
                        >
                            No account? Sign up!
                        </Link>
                        <Link
                            className="btn btn-lg btn-link"
                            to="/forgot-password"
                        >
                            Forgot your password?
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

SignIn.propTypes = {
    ...propTypes,
    signIn: PropTypes.func.isRequired,
    previousRoute: PropTypes.string,
};

export default reduxForm({
    form: 'signIn',
    fields: signInSchema.fields,
    validate: signInSchema.validate,
    destroyOnUnmount: false,
}, state => {
    let previousRoute;
    try {
        previousRoute = state.routing.locationBeforeTransitions.state.nextPathname;
    } catch (error) {
        previousRoute = '/';
    }

    return {
        previousRoute,
        signInError: state.user.error,
    };
}, {
    signIn: signInActions.request,
})(SignIn);
