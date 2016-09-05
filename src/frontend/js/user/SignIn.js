import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { propTypes, reduxForm, Field } from 'redux-form';
import buildSchema from 'redux-form-schema';

import Alert from '../ui/Alert';
import { BigLinkButton } from '../ui/LinkButton';
import HelmetTitle from '../app/HelmetTitle';
import FormGroup from '../ui/FormGroup';
import { BigSubmitButton } from '../ui/SubmitButton';
import { signIn as signInActions } from './actions';
import { getPreviousRoute } from './reducer';

const signInSchema = buildSchema({
    email: {
        label: 'email',
        required: true,
        type: 'email',
    },
    password: {
        label: 'password',
        required: true,
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

const SignIn = ({
    /* eslint-disable react/prop-types */
    signInError,
    signIn,
    previousRoute,
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
                    {signInError && <Alert>{signInError.message}</Alert>}

                    <form onSubmit={handleSubmit(signIn.bind(null, previousRoute))}>
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
                        <BigSubmitButton error={signInError || submitFailed} submitting={submitting}>
                            Sign in
                        </BigSubmitButton>
                        <BigLinkButton to={{ pathname: '/sign-up', state: { nextPathname: previousRoute } }}>
                            No account? Sign up!
                        </BigLinkButton>
                        <BigLinkButton to="/forgot-password">
                            Forgot your password?
                        </BigLinkButton>
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

const mapStateToProps = state => ({
    previousRoute: getPreviousRoute(state),
    signInError: state.user.error,
});

const mapDispatchToProps = ({ signIn: signInActions.request });

export default reduxForm({
    form: 'signIn',
    validate: signInSchema.validate,
    destroyOnUnmount: false,
})(connect(mapStateToProps, mapDispatchToProps)(SignIn));
