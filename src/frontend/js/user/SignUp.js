import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { propTypes, reduxForm, Field } from 'redux-form';
import buildSchema from 'redux-form-schema';

import HelmetTitle from '../app/HelmetTitle';
import FormGroup from '../ui/FormGroup';
import SubmitButton from '../ui/SubmitButton';
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

const renderInput = field => (
    <FormGroup field={field}>
        <input
            {...field.input}
            className="form-control input-lg"
            type={field.type}
        />
    </FormGroup>
);

const SignUp = ({
    /* eslint-disable react/prop-types */
    signUpError,
    signUp,
    previousRoute,
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
                        <Field
                            name="email"
                            component={renderInput}
                            type="email"
                        />
                        <Field
                            name="password"
                            component={renderInput}
                            type="password"
                        />
                        <Field
                            name="confirmPassword"
                            component={renderInput}
                            type="password"
                        />

                        <SubmitButton error={signUpError || submitFailed} submitting={submitting}>
                            Sign up
                        </SubmitButton>

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

const mapStateToProps = state => {
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
};

const mapDispatchToProps = dispatch => bindActionCreators({
    signUp: signUpActions.request,
}, dispatch);

export default reduxForm({
    form: 'signUp',
    validate: signUpSchema.validate,
    destroyOnUnmount: false,
})(connect(mapStateToProps, mapDispatchToProps)(SignUp));
