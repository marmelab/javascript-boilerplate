import { expect } from 'chai';
import orderActions, { orderActionTypes } from './orderActions';

describe('orderActions', () => {
    it('orderActions.list.request should return the correct action', () => {
        expect(orderActions.list.request()).to.deep.equal({
            type: orderActionTypes.list.REQUEST,
            payload: undefined,
        });
    });

    it('orderActions.list.success should return the correct action', () => {
        expect(orderActions.list.success([ { id: 1 } ])).to.deep.equal({
            type: orderActionTypes.list.SUCCESS,
            payload: [ { id: 1 } ],
        });
    });

    it('orderActions.list.failure should return the correct action', () => {
        const error = new Error('Run you fools !');
        expect(orderActions.list.failure(error)).to.deep.equal({
            type: orderActionTypes.list.FAILURE,
            payload: error,
            error: true,
        });
    });
});
