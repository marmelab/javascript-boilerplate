import {expect} from 'chai';
import orderReducer from './orderReducer';
import { ORDERS_LOADED } from './orderActions';

describe('order reducer', () => {
    it('should return its initial state', () => {
        expect(orderReducer(undefined, { type: 'foo' })).to.deep.equal({
            orders: [],
            order: {},
            error: false,
        });
    });

    it('should handle the successfull ORDERS_LOADED action', () => {
        expect(orderReducer(undefined, { type: ORDERS_LOADED, payload: [{ id: 1 }]})).to.deep.equal({
            error: false,
            order: {},
            orders: [{ id: 1 }],
        });
    });

    it('should handle the failed ORDERS_LOADED action', () => {
        const error = new Error('Run you fools!');
        expect(orderReducer(undefined, { type: ORDERS_LOADED, payload: error, error: true } )).to.deep.equal({
            order: {},
            orders: [],
            error,
        });
    });
});
