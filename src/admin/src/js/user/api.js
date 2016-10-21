/* globals ADMIN_API_URL */
import fetchFactory from '../../../../common/fetch/fetch';

export const fetchSignIn = fetchFactory(`${ADMIN_API_URL}/sign-in`, 'POST');
export const fetchSignUp = fetchFactory(`${ADMIN_API_URL}/sign-up`, 'POST');

export const storeLocalUser = ({ id, email, exp, token }) => {
    localStorage.setItem('id', id);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('expires', exp);
};

export const removeLocalUser = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
};
