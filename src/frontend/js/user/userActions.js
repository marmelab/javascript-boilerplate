import { createAction } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const login = createAction(LOGIN, (previousRoute, credentials) => ({
    previousRoute,
    ...credentials,
}));

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = createAction(LOGIN_ERROR);

export const LOGOUT = 'LOGOUT';
export const logout = createAction(LOGOUT);

export const SIGNED_IN = 'SIGNED_IN';
export const signedIn = createAction(SIGNED_IN, user => user);

export const SIGNED_OUT = 'SIGNED_OUT';
export const signedOut = createAction(SIGNED_OUT);
