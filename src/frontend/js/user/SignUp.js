import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';
import { propTypes, reduxForm, Field } from 'redux-form';
import buildSchema from 'redux-form-schema';

import Alert from '../ui/Alert';
import { BigLinkButton } from '../ui/LinkButton';
import FormGroup from '../ui/FormGroup';
import { BigSubmitButton } from '../ui/SubmitButton';
import { signUp as signUpActions } from './actions';
import { getPreviousRoute } from './reducer';
import withWindowTitle from '../app/withWindowTitle';

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
        <div className="row">
            <div className="col-xs-12">
                <div className="jumbotron">
                    <h2 className="display-4">Sign up</h2>
                    {signUpError && <Alert>{signUpError.message}</Alert>}

                    <form onSubmit={handleSubmit(signUp)}>
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

                        <BigSubmitButton error={signUpError || submitFailed} submitting={submitting}>
                            Sign up
                        </BigSubmitButton>

                        <BigLinkButton to={{ pathname: '/sign-in', state: { nextPathname: previousRoute } }}>
                            Already have an account ? Sign in !
                        </BigLinkButton>
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

const mapStateToProps = state => ({
    previousRoute: getPreviousRoute(state),
    signUpError: state.user.error,
});

const mapDispatchToProps = ({ signUp: signUpActions.request });

export default compose(
    reduxForm({
        form: 'signUp',
        validate: signUpSchema.validate,
        destroyOnUnmount: false,
    }),
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        signUp: props => values => props.signUp(props.previousRoute, values),
    }),
    withWindowTitle('Sign up'),
)(SignUp);
