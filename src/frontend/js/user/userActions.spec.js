import { expect } from 'chai';
import { signIn, SIGN_IN, signOut, SIGN_OUT, signedIn, SIGNED_IN, signedOut, SIGNED_OUT } from './userActions';

describe('userActions', () => {
    it('signIn should return the correct action', () => {
        expect(signIn('/route', { email: 'test_email', password: 'test_password' })).to.deep.equal({
            type: SIGN_IN,
            payload: {
                previousRoute: '/route',
                email: 'test_email',
                password: 'test_password',
            },
        });
    });

    it('signOut should return the correct action', () => {
        expect(signOut()).to.deep.equal({
            type: SIGN_OUT,
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
