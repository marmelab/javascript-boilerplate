import { createAction } from 'redux-actions';
import createFetchActionTypes from 'isomorphic/fetch/createFetchActionTypes';

export const userActionTypes = {
    signIn: createFetchActionTypes('SIGN_IN'),
    signUp: createFetchActionTypes('SIGN_UP'),
    signOut: createFetchActionTypes('SIGN_OUT'),
};

export const signIn = {
    request: createAction(userActionTypes.signIn.REQUEST, (previousRoute, credentials) => ({
        previousRoute,
        body: credentials,
    })),
    success: createAction(userActionTypes.signIn.SUCCESS),
    failure: createAction(userActionTypes.signIn.FAILURE),
};

export const signUp = {
    request: createAction(userActionTypes.signUp.REQUEST, (previousRoute, credentials) => ({
        previousRoute,
        body: credentials,
    })),
    success: createAction(userActionTypes.signUp.SUCCESS),
    failure: createAction(userActionTypes.signUp.FAILURE),
};

export const signOut = {
    request: createAction(userActionTypes.signOut.REQUEST),
    success: createAction(userActionTypes.signOut.SUCCESS),
    failure: createAction(userActionTypes.signOut.FAILURE),
};
