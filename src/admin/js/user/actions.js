import { createAction } from 'redux-actions';
import createFetchActionTypes from '../../../isomorphic/fetch/createFetchActionTypes';

export const userActionTypes = {
    signIn: createFetchActionTypes('SIGN_IN'),
    signOut: createFetchActionTypes('SIGN_OUT'),
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
