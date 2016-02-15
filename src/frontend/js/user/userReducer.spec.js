import {expect} from 'chai';
import sinon from 'sinon';
import reducerFactory from './userReducer';
import { SIGNED_IN, SIGNED_OUT } from './userActions';

describe('user reducer', () => {
    const getItemWithUser = sinon.stub();
    getItemWithUser.withArgs('id').returns('foo');
    getItemWithUser.withArgs('email').returns('foo@bar.com');
    getItemWithUser.withArgs('token').returns('bar');

    const sessionStorageWithUser = {
        getItem: getItemWithUser,
    };

    it('should return the user saved in sessionStorage as its initial state', () => {
        const reducer = reducerFactory(sessionStorageWithUser);

        expect(reducer(undefined, { type: 'foo' })).to.deep.equal({
            authenticated: true,
            id: 'foo',
            email: 'foo@bar.com',
            token: 'bar',
        });
    });

    it('should handle the SIGNED_IN action', () => {
        const getItem = sinon.stub().returns(undefined);
        const sessionStorage = {
            getItem,
        };
        const reducer = reducerFactory(sessionStorage);

        expect(reducer(undefined, { type: SIGNED_IN, payload: {
            email: 'foo@bar.com',
            id: 'foo',
            token: 'bar',
        }})).to.deep.equal({
            authenticated: true,
            id: 'foo',
            email: 'foo@bar.com',
            token: 'bar',
        });
    });

    it('should handle the SIGNED_OUT action', () => {
        const reducer = reducerFactory(sessionStorageWithUser);

        expect(reducer(undefined, { type: SIGNED_OUT })).to.deep.equal({
            authenticated: false,
            id: undefined,
            email: undefined,
            token: undefined,
        });
    });
});
