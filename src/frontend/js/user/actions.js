import { createAction } from 'redux-actions';
import createRequestActionTypes from '../app/entities/createRequestActionTypes';

export const userActionTypes = {
    signIn: createRequestActionTypes('SIGN_IN'),
    signUp: createRequestActionTypes('SIGN_UP'),
    signOut: createRequestActionTypes('SIGN_OUT'),
};

export const signIn = {
    request: createAction(userActionTypes.signIn.REQUEST, (previousRoute, credentials) => ({
        previousRoute,
        ...credentials,
    })),
    success: createAction(userActionTypes.signIn.SUCCESS),
    failure: createAction(userActionTypes.signIn.FAILURE),
};

export const signUp = {
    request: createAction(userActionTypes.signUp.REQUEST, (previousRoute, credentials) => ({
        previousRoute,
        ...credentials,
    })),
    success: createAction(userActionTypes.signUp.SUCCESS),
    failure: createAction(userActionTypes.signUp.FAILURE),
};

export const signOut = {
    request: createAction(userActionTypes.signOut.REQUEST),
    success: createAction(userActionTypes.signOut.SUCCESS),
    failure: createAction(userActionTypes.signOut.FAILURE),
};
