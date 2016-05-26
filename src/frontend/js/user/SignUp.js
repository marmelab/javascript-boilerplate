import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { reduxForm, propTypes } from 'redux-form';
import buildSchema from 'redux-form-schema';
import HelmetTitle from '../app/HelmetTitle';
import { Link } from 'react-router';
import { signUp as signUpActions } from './userActions';

const signUpSchema = buildSchema({
    email: {
        label: 'email',
        required: true,
        type: 'email',
    },
    password: {
        label: 'password',
        required: true,
    },
    confirmPassword: {
        label: 'password confirmation',
        required: true,
        error: 'Please enter the same password twice',
        validate: {
            passwordConfirmed: (formValues, fieldValue) => fieldValue === formValues.password,
        },
    },
});

const SignUp = ({
    /* eslint-disable react/prop-types */
    signUpError,
    signUp,
    previousRoute,
    fields: { email, password, confirmPassword },
    handleSubmit,
    submitting,
    submitFailed,
    /* eslint-enable react/prop-types */
}) => (
    <div className="container signUp">
        <HelmetTitle title="Sign up" />
        <div className="row">
            <div className="col-xs-12">
                <div className="jumbotron">
                    <h2 className="display-4">Sign up</h2>
                    {signUpError &&
                        <div className="alert alert-danger" role="alert">
                            {signUpError.message}
                        </div>
                    }
                    <form onSubmit={handleSubmit(signUp.bind(null, previousRoute))}>
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
                        <div className={classNames('form-group', {
                            'has-error': confirmPassword.touched && confirmPassword.error,
                        })}
                        >
                            <input
                                type="password"
                                className="form-control input-lg"
                                placeholder="Confirm your password"
                                {...confirmPassword}
                            />
                            {confirmPassword.touched && confirmPassword.error &&
                                <span className="help-block">{confirmPassword.error}</span>
                            }
                        </div>
                        <button type="submit" className={classNames('btn btn-lg btn-primary', {
                            'btn-danger': signUpError || submitFailed,
                        })} disabled={submitting}
                        >
                            Sign up
                        </button>
                        <Link
                            className="btn btn-lg btn-link"
                            to={{ pathname: '/sign-in', state: { nextPathname: previousRoute } }}
                        >
                            Already have an account ? Sign in !
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

SignUp.propTypes = {
    ...propTypes,
    signUp: PropTypes.func.isRequired,
    previousRoute: PropTypes.string,
};

export default reduxForm({
    form: 'signUp',
    fields: signUpSchema.fields,
    validate: signUpSchema.validate,
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
    signUp: signUpActions.request,
})(SignUp);
