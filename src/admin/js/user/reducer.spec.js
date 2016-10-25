import expect, { createSpy } from 'expect';
import reducerFactory, { isAuthenticated } from './reducer';
import { signIn, signOut } from './actions';

describe('user reducer', () => {
    const expireTokenTime = new Date(Date.now() + (30 * 1000));
    const getItemWithUser = createSpy().andCall((key) => {
        switch (key) {
        case 'id':
            return 'foo';
        case 'email':
            return 'foo@bar.com';
        case 'token':
            return 'bar';
        case 'expires':
            return expireTokenTime.getTime() / 1000;
        default:
            return null;
        }
    });

    const localStorageWithUser = {
        getItem: getItemWithUser,
    };

    it('should return the user saved in localStorage as its initial state', () => {
        const reducer = reducerFactory(localStorageWithUser);

        expect(reducer(undefined, { type: 'foo' })).toEqual({
            authenticated: true,
            email: 'foo@bar.com',
            id: 'foo',
            loading: false,
            token: 'bar',
            expires: expireTokenTime,
        });
    });

    it('should handle the signIn.success action', () => {
        const getItem = createSpy().andReturn(undefined);
        const localStorage = {
            getItem,
        };
        const reducer = reducerFactory(localStorage);

        expect(reducer(undefined, signIn.success({
            email: 'foo@bar.com',
            id: 'foo',
            token: 'bar',
            expires: expireTokenTime,
        }))).toEqual({
            authenticated: true,
            error: false,
            id: 'foo',
            email: 'foo@bar.com',
            loading: false,
            token: 'bar',
            expires: expireTokenTime,
        });
    });

    it('should handle the signOut.success action', () => {
        const reducer = reducerFactory(localStorageWithUser);

        expect(reducer(undefined, signOut.success())).toEqual({
            authenticated: false,
            id: null,
            email: null,
            loading: false,
            token: null,
            expires: null,
        });
    });

    describe('isAuthenticated', () => {
        it('should return false if state.user.authenticated is false', () => {
            expect(isAuthenticated({ user: { authenticated: false } })).toEqual(false);
        });

        it('should return false if state.user.expires is anterior to now', () => {
            const expires = new Date(Date.now() - 1000);
            expect(isAuthenticated({ user: { authenticated: true, expires } })).toEqual(false);
        });

        it('should return true if state.user.expires is posterior to now', () => {
            const expires = new Date(Date.now() + 1000);
            expect(isAuthenticated({ user: { authenticated: true, expires } })).toEqual(true);
        });
    });
});
