import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { propTypes, reduxForm, Field } from 'redux-form';
import buildSchema from 'redux-form-schema';
import { Link } from 'react-router';

import { Card, CardActions, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

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

const renderInput = (floatingLabelText, type, hintText) =>
    ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) => // eslint-disable-line react/prop-types
        <TextField
            errorText={touched && error}
            {...{ floatingLabelText, type, hintText }}
            {...inputProps}
            {...props}
            fullWidth
        />;

class SignIn extends Component {
    signIn = values => {
        this.props.signIn(this.props.previousRoute, values);
    }

    render() {
        const { signInError, handleSubmit, submitting } = this.props;

        return (
            <Card className="sign-in" style={{ margin: '2em' }}>
                <CardTitle title="Sign in" />
                {signInError && <Snackbar open autoHideDuration={4000} message={signInError.message} />}

                <form onSubmit={handleSubmit(this.signIn)}>
                    <div style={{ padding: '0 1em 1em 1em' }}>
                        <div>
                            <Field
                                name="email"
                                component={renderInput('Email', 'email', 'john@doe.me')}
                            />
                        </div>
                        <div>
                            <Field
                                name="password"
                                component={renderInput('Password', 'password', '5upa_dupa_pwd')}
                            />
                        </div>
                    </div>
                    <CardActions>
                        <RaisedButton type="submit" primary disabled={submitting} label="Sign in" />

                        <FlatButton
                            containerElement={<Link to="/forgot-password" />}
                            href="#"
                            disabled={submitting}
                            label="Forgot your password?"
                        />
                    </CardActions>
                </form>
            </Card>
        );
    }
}

SignIn.propTypes = {
    ...propTypes,
    signIn: PropTypes.func.isRequired,
    previousRoute: PropTypes.string,
};

const mapStateToProps = state => ({
    previousRoute: getPreviousRoute(state),
    signInError: state.user.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({ signIn: signInActions.request }, dispatch);

export default reduxForm({
    form: 'signIn',
    validate: signInSchema.validate,
    destroyOnUnmount: false,
})(connect(mapStateToProps, mapDispatchToProps)(SignIn));
