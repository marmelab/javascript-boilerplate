import { expect } from 'chai';
import reducer from './reducer';
import {
    ADD_PRODUCT_TO_SHOPPING_CART,
    REMOVE_PRODUCT_FROM_SHOPPING_CART,
    SET_SHOPPING_CART_ITEM_QUANTITY,
} from './actions';

describe('order reducer', () => {
    it('should return its initial state', () => {
        expect(reducer(undefined, { type: 'foo' })).to.deep.equal({
            products: [],
            total: 0,
        });
    });

    it('should handle the ADD_PRODUCT_TO_SHOPPING_CART action', () => {
        expect(reducer(undefined, {
            type: ADD_PRODUCT_TO_SHOPPING_CART,
            payload: { id: 42, quantity: 1, price: 84 },
        })).to.deep.equal({
            products: [
                { id: 42, quantity: 1, price: 84 },
            ],
            total: 84,
        });
    });

    it('should handle the ADD_PRODUCT_TO_SHOPPING_CART action with a new product', () => {
        expect(reducer({
            products: [
                { id: 43, quantity: 1, price: 20 },
            ],
        }, {
            type: ADD_PRODUCT_TO_SHOPPING_CART,
            payload: { id: 42, quantity: 1, price: 10 },
        })).to.deep.equal({
            products: [
                { id: 43, quantity: 1, price: 20 },
                { id: 42, quantity: 1, price: 10 },
            ],
            total: 30,
        });
    });

    it('should handle the ADD_PRODUCT_TO_SHOPPING_CART action with an existing product', () => {
        expect(reducer({
            products: [
                { id: 42, quantity: 1, price: 10 },
                { id: 43, quantity: 1, price: 20 },
            ],
        }, {
            type: ADD_PRODUCT_TO_SHOPPING_CART,
            payload: { id: 42, quantity: 1, price: 10 },
        })).to.deep.equal({
            products: [
                { id: 42, quantity: 2, price: 10 },
                { id: 43, quantity: 1, price: 20 },
            ],
            total: 40,
        });
    });

    it('should handle the REMOVE_PRODUCT_FROM_SHOPPING_CART action', () => {
        expect(reducer({
            products: [
                { id: 42, quantity: 1, price: 10 },
                { id: 43, quantity: 1, price: 20 },
            ],
        }, { type: REMOVE_PRODUCT_FROM_SHOPPING_CART, payload: 42 })).to.deep.equal({
            products: [
                { id: 43, quantity: 1, price: 20 },
            ],
            total: 20,
        });
    });

    it('should handle the SET_SHOPPING_CART_ITEM_QUANTITY action', () => {
        expect(reducer({
            products: [
                { id: 42, quantity: 1, price: 10 },
                { id: 43, quantity: 1, price: 20 },
            ],
        }, {
            type: SET_SHOPPING_CART_ITEM_QUANTITY,
            payload: { id: 42, quantity: 100 },
        })).to.deep.equal({
            products: [
                { id: 42, quantity: 100, price: 10 },
                { id: 43, quantity: 1, price: 20 },
            ],
            total: 1020,
        });
    });
});
