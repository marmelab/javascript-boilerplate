/* global angular ADMIN_API_URL */
import fetchFactory from '../../../isomorphic/fetch/fetch';

export const fetchSignIn = fetchFactory(`${ADMIN_API_URL}/sign-in`, 'POST');

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
