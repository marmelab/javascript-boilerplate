import {expect} from 'chai';
import sinon from 'sinon';
import reducerFactory from './userReducer';

describe('user reducer', () => {
    const getItem = sinon.stub();
    getItem.withArgs('id').returns('foo');
    getItem.withArgs('email').returns('foo@bar.com');
    getItem.withArgs('token').returns('bar');

    const sessionStorage = {
        getItem,
    };

    const reducer = reducerFactory(sessionStorage);

    it('should return the user saved in sessionStorage as its initial state', () => {
        expect(reducer()).to.deep.equal({
            id: 'foo',
            email: 'foo@bar.com',
            token: 'bar',
        });
    });
});
