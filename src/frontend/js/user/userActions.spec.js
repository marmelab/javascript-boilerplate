import { expect } from 'chai';
import { login, LOGIN, logout, LOGOUT, loginError, LOGIN_ERROR, signedIn, SIGNED_IN, signedOut, SIGNED_OUT } from './userActions';

describe('userActions', () => {
    it('login should return the correct action', () => {
        expect(login('/route', { email: 'test_email', password: 'test_password' })).to.deep.equal({
            type: LOGIN,
            payload: {
                previousRoute: '/route',
                email: 'test_email',
                password: 'test_password',
            },
        });
    });

    it('loginError should return the correct action', () => {
        const error = new Error('Run you fools!');
        expect(loginError(error)).to.deep.equal({
            type: LOGIN_ERROR,
            payload: error,
            error: true,
        });
    });

    it('logout should return the correct action', () => {
        expect(logout()).to.deep.equal({
            type: LOGOUT,
            payload: undefined,
        });
    });

    it('signedOut should return the correct action', () => {
        expect(signedOut()).to.deep.equal({
            type: SIGNED_OUT,
            payload: undefined,
        });
    });

    it('signedIn should return the correct action', () => {
        expect(signedIn({ id: 'foo' })).to.deep.equal({
            type: SIGNED_IN,
            payload: { id: 'foo' },
        });
    });
});
