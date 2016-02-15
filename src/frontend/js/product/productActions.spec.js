import { expect } from 'chai';
import { LOAD_PRODUCTS, loadProducts, PRODUCTS_LOADED, productsLoaded } from './productActions';

describe('orderActions', () => {
    it('loadOrders should return the correct action', () => {
        expect(loadProducts()).to.deep.equal({
            type: LOAD_PRODUCTS,
            payload: undefined,
        });
    });

    it('ordersLoaded should return the correct action', () => {
        expect(productsLoaded([ { id: 1 } ])).to.deep.equal({
            type: PRODUCTS_LOADED,
            payload: [ { id: 1 } ],
        });
    });
});
