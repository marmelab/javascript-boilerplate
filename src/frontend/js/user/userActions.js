import { createAction } from 'redux-actions';
import createRequestActionTypes from '../app/entities/createRequestActionTypes';

export const userActionTypes = {
    signIn: createRequestActionTypes('SIGN_IN'),
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

export const signOut = {
    request: createAction(userActionTypes.signOut.REQUEST),
    success: createAction(userActionTypes.signOut.SUCCESS),
    failure: createAction(userActionTypes.signOut.FAILURE),
};
