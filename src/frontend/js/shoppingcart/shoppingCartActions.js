import { createAction } from 'redux-actions';

export const ADD_PRODUCT_TO_SHOPPING_CART = 'ADD_PRODUCT_TO_SHOPPING_CART';
export const addProductToShoppingCart = createAction(ADD_PRODUCT_TO_SHOPPING_CART, product => ({ ...product, quantity: 1 }));

export const REMOVE_PRODUCT_FROM_SHOPPING_CART = 'REMOVE_PRODUCT_FROM_SHOPPING_CART';
export const removeProductFromShoppingCart = createAction(REMOVE_PRODUCT_FROM_SHOPPING_CART);

export const SET_SHOPPING_CART_ITEM_QUANTITY = 'SET_SHOPPING_CART_ITEM_QUANTITY';
export const setShoppingCartItemQuantity = createAction(SET_SHOPPING_CART_ITEM_QUANTITY, (id, quantity) => ({ id, quantity }));
