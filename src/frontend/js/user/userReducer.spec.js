import {expect} from 'chai';
import sinon from 'sinon';
import reducerFactory from './userReducer';
import { signIn, signOut, signUp } from './userActions';

describe('user reducer', () => {
    const getItemWithUser = sinon.stub();
    const expireTokenTime = (new Date()).getTime() + 30 * 1000;
    getItemWithUser.withArgs('id').returns('foo');
    getItemWithUser.withArgs('email').returns('foo@bar.com');
    getItemWithUser.withArgs('token').returns('bar');
    getItemWithUser.withArgs('expires').returns(expireTokenTime);

    const localStorageWithUser = {
        getItem: getItemWithUser,
    };

    it('should return the user saved in localStorage as its initial state', () => {
        const reducer = reducerFactory(localStorageWithUser);

        expect(reducer(undefined, { type: 'foo' })).to.deep.equal({
            authenticated: true,
            email: 'foo@bar.com',
            id: 'foo',
            loading: false,
            token: 'bar',
            expires: expireTokenTime,
        });
    });

    it('should handle the signIn.success action', () => {
        const getItem = sinon.stub().returns(undefined);
        const localStorage = {
            getItem,
        };
        const reducer = reducerFactory(localStorage);

        expect(reducer(undefined, signIn.success({
            email: 'foo@bar.com',
            id: 'foo',
            token: 'bar',
            expires: expireTokenTime,
        }))).to.deep.equal({
            authenticated: true,
            error: false,
            id: 'foo',
            email: 'foo@bar.com',
            loading: false,
            token: 'bar',
            expires: expireTokenTime,
        });
    });

    it('should handle the signIn.failure action', () => {
        const getItem = sinon.stub().returns(undefined);
        const localStorage = {
            getItem,
        };
        const reducer = reducerFactory(localStorage);
        const error = new Error('Run you fools!');
        expect(reducer(undefined, signIn.failure(error))).to.deep.equal({
            id: null,
            email: null,
            token: null,
            expires: null,
            authenticated: false,
            loading: false,
            error,
        });
    });

    it('should handle the signUp.success action', () => {
        const getItem = sinon.stub().returns(undefined);
        const localStorage = {
            getItem,
        };
        const reducer = reducerFactory(localStorage);

        expect(reducer(undefined, signUp.success({
            email: 'foo@bar.com',
            id: 'foo',
            token: 'bar',
            expires: expireTokenTime,
        }))).to.deep.equal({
            authenticated: true,
            error: false,
            id: 'foo',
            email: 'foo@bar.com',
            loading: false,
            token: 'bar',
            expires: expireTokenTime,
        });
    });

    it('should handle the signUp.failure action', () => {
        const getItem = sinon.stub().returns(undefined);
        const localStorage = {
            getItem,
        };
        const reducer = reducerFactory(localStorage);
        const error = new Error('Run you fools!');
        expect(reducer(undefined, signUp.failure(error))).to.deep.equal({
            id: null,
            email: null,
            token: null,
            expires: null,
            authenticated: false,
            loading: false,
            error,
        });
    });

    it('should handle the signOut.success action', () => {
        const reducer = reducerFactory(localStorageWithUser);

        expect(reducer(undefined, signOut.success())).to.deep.equal({
            authenticated: false,
            id: null,
            email: null,
            loading: false,
            token: null,
            expires: null,
        });
    });
});
