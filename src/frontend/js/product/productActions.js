import { createAction } from 'redux-actions';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const loadProducts = createAction(LOAD_PRODUCTS);

export const PRODUCTS_LOADED = 'PRODUCTS_LOADED';
export const productsLoaded = createAction(PRODUCTS_LOADED);
