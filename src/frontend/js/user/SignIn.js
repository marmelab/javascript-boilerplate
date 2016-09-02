import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { propTypes, reduxForm, Field } from 'redux-form';
import buildSchema from 'redux-form-schema';

import HelmetTitle from '../app/HelmetTitle';
import FormGroup from '../ui/FormGroup';
import SubmitButton from '../ui/SubmitButton';
import { signIn as signInActions } from './userActions';

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
                    {signInError &&
                        <div className="alert alert-danger" role="alert">
                            {signInError.message}
                        </div>
                    }
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
                        <SubmitButton error={signInError || submitFailed} submitting={submitting}>
                            Sign in
                        </SubmitButton>
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
    signIn: signInActions.request,
}, dispatch);

export default reduxForm({
    form: 'signIn',
    validate: signInSchema.validate,
    destroyOnUnmount: false,
})(connect(mapStateToProps, mapDispatchToProps)(SignIn));
