import { expect } from 'chai';
import { LOAD_ORDERS, loadOrders, ORDERS_LOADED, ordersLoaded } from './orderActions';

describe('orderActions', () => {
    it('loadOrders should return the correct action', () => {
        expect(loadOrders()).to.deep.equal({
            type: LOAD_ORDERS,
            payload: undefined,
        });
    });

    it('ordersLoaded should return the correct action', () => {
        expect(ordersLoaded([ { id: 1 } ])).to.deep.equal({
            type: ORDERS_LOADED,
            payload: [ { id: 1 } ],
        });
    });
});
