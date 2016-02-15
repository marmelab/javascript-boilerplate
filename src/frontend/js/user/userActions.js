import { createAction } from 'redux-actions';

export const SIGN_IN = 'SIGN_IN';
export const signIn = createAction(SIGN_IN, (previousRoute, credentials) => ({
    previousRoute,
    ...credentials,
}));

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = createAction(SIGN_OUT);

export const SIGNED_IN = 'SIGNED_IN';
export const signedIn = createAction(SIGNED_IN);

export const SIGNED_OUT = 'SIGNED_OUT';
export const signedOut = createAction(SIGNED_OUT);
