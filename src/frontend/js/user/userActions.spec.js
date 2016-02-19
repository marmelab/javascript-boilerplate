import { expect } from 'chai';
import { signIn, signUp, signOut, userActionTypes } from './userActions';

describe('userActions', () => {
    it('signIn.request should return the correct action', () => {
        expect(signIn.request('/route', { email: 'test_email', password: 'test_password' })).to.deep.equal({
            type: userActionTypes.signIn.REQUEST,
            payload: {
                previousRoute: '/route',
                email: 'test_email',
                password: 'test_password',
            },
        });
    });

    it('signIn.success should return the correct action', () => {
        expect(signIn.success({ id: 'id_test', email: 'test_email', token: 'test_token' })).to.deep.equal({
            type: userActionTypes.signIn.SUCCESS,
            payload: { id: 'id_test', email: 'test_email', token: 'test_token' },
        });
    });

    it('signIn.failure should return the correct action', () => {
        const error = new Error('Run you fools !');

        expect(signIn.failure(error)).to.deep.equal({
            type: userActionTypes.signIn.FAILURE,
            payload: error,
            error: true,
        });
    });

    it('signUp.request should return the correct action', () => {
        expect(signUp.request('/route', { email: 'test_email', password: 'test_password' })).to.deep.equal({
            type: userActionTypes.signUp.REQUEST,
            payload: {
                previousRoute: '/route',
                email: 'test_email',
                password: 'test_password',
            },
        });
    });

    it('signUp.success should return the correct action', () => {
        expect(signUp.success({ id: 'id_test', email: 'test_email', token: 'test_token' })).to.deep.equal({
            type: userActionTypes.signUp.SUCCESS,
            payload: { id: 'id_test', email: 'test_email', token: 'test_token' },
        });
    });

    it('signUp.failure should return the correct action', () => {
        const error = new Error('Run you fools !');

        expect(signUp.failure(error)).to.deep.equal({
            type: userActionTypes.signUp.FAILURE,
            payload: error,
            error: true,
        });
    });

    it('signOut.request should return the correct action', () => {
        expect(signOut.request()).to.deep.equal({
            type: userActionTypes.signOut.REQUEST,
            payload: undefined,
        });
    });

    it('signOut.success should return the correct action', () => {
        expect(signOut.success()).to.deep.equal({
            type: userActionTypes.signOut.SUCCESS,
            payload: undefined,
        });
    });
});
