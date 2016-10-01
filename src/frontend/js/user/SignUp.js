import React, { Component, PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { propTypes, reduxForm, Field } from 'redux-form';
import buildSchema from 'redux-form-schema';

import Alert from '../ui/Alert';
import { BigLinkButton } from '../ui/LinkButton';
import { BigSubmitButton } from '../ui/SubmitButton';
import { signUp as signUpActions } from './actions';
import { getPreviousRoute } from './reducer';
import withWindowTitle from '../app/withWindowTitle';
import renderInput from '../ui/renderInput';

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

class SignUp extends Component {
    signUp = (values) => {
        this.props.signUp(this.props.previousRoute, values);
    }

    render() {
        const {
            /* eslint-disable react/prop-types */
            signUpError,
            previousRoute,
            handleSubmit,
            submitting,
            submitFailed,
            /* eslint-enable react/prop-types */
        } = this.props;

        return (
            <div className="container signUp">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="jumbotron">
                            <h2 className="display-4">Sign up</h2>
                            {signUpError && <Alert>{signUpError.message}</Alert>}

                            <form onSubmit={handleSubmit(this.signUp)}>
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
    }
}

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
    withWindowTitle('Sign up'),
)(SignUp);
