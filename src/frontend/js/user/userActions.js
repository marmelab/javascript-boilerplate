import { routeActions } from 'react-router-redux';

export const SIGNED_IN = 'SIGNED_IN';
export const signedIn = user => ({
    type: SIGNED_IN,
    user,
});

export const login = (previousRoute, credentials) => dispatch => {
    sessionStorage.setItem('id', 1);
    sessionStorage.setItem('email', 'toto@toto.com');
    sessionStorage.setItem('token', 'aaaaaaa');

    dispatch(signedIn({
        token: 'aaaaaaa',
        email: 'toto@toto.com',
    }));

    dispatch(routeActions.push(previousRoute));
};

export const SIGNED_OUT = 'SIGNED_OUT';
export const logout = () => dispatch => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');

    dispatch({
        type: SIGNED_OUT,
    });

    dispatch(routeActions.push('/'));
};
