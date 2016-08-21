import { expect } from 'chai';
import {
    ADD_PRODUCT_TO_SHOPPING_CART, addProductToShoppingCart,
    REMOVE_PRODUCT_FROM_SHOPPING_CART, removeProductFromShoppingCart,
    SET_SHOPPING_CART_ITEM_QUANTITY, setShoppingCartItemQuantity,
    CLEAR_SHOPPING_CART, clearShoppingCart,
} from './shoppingCartActions';

describe('orderActions', () => {
    it('addProductToShoppingCart should return the correct action', () => {
        expect(addProductToShoppingCart({ id: 1 })).to.deep.equal({
            type: ADD_PRODUCT_TO_SHOPPING_CART,
            payload: { id: 1, quantity: 1 },
        });
    });

    it('removeProductFromShoppingCart should return the correct action', () => {
        expect(removeProductFromShoppingCart({ id: 1 })).to.deep.equal({
            type: REMOVE_PRODUCT_FROM_SHOPPING_CART,
            payload: { id: 1 },
        });
    });

    it('setShoppingCartItemQuantity should return the correct action', () => {
        expect(setShoppingCartItemQuantity(42, 100)).to.deep.equal({
            type: SET_SHOPPING_CART_ITEM_QUANTITY,
            payload: {
                id: 42,
                quantity: 100,
            },
        });
    });

    it('clearShoppingCart should return the correct action', () => {
        expect(clearShoppingCart()).to.deep.equal({
            type: CLEAR_SHOPPING_CART,
        });
    });
});
