/* globals API_URL */
import fetchFactory from 'isomorphic/fetch/fetch';

export const fetchSignIn = fetchFactory('sign-in', 'POST');
export const fetchSignUp = fetchFactory('sign-up', 'POST');

export const storeLocalUser = ({ id, email, token, expires }) => {
    localStorage.setItem('id', id);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('expires', expires);
};

export const removeLocalUser = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
};
