import { expect } from 'chai';
import { LOAD_PRODUCT, loadProduct, PRODUCT_LOADED, productLoaded, LOAD_PRODUCTS, loadProducts, PRODUCTS_LOADED, productsLoaded } from './productActions';

describe('orderActions', () => {
    it('loadProducts should return the correct action', () => {
        expect(loadProducts()).to.deep.equal({
            type: LOAD_PRODUCTS,
            payload: undefined,
        });
    });

    it('productsLoaded should return the correct action', () => {
        expect(productsLoaded([ { id: 1 } ])).to.deep.equal({
            type: PRODUCTS_LOADED,
            payload: [ { id: 1 } ],
        });
    });

    it('loadProduct should return the correct action', () => {
        expect(loadProduct()).to.deep.equal({
            type: LOAD_PRODUCT,
            payload: undefined,
        });
    });

    it('productLoaded should return the correct action', () => {
        expect(productLoaded([ { id: 1 } ])).to.deep.equal({
            type: PRODUCT_LOADED,
            payload: [ { id: 1 } ],
        });
    });
});
