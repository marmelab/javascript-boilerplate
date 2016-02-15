import { createAction } from 'redux-actions';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const loadProducts = createAction(LOAD_PRODUCTS);

export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const loadProduct = createAction(LOAD_PRODUCT);

export const PRODUCTS_LOADED = 'PRODUCTS_LOADED';
export const productsLoaded = createAction(PRODUCTS_LOADED);

export const PRODUCT_LOADED = 'PRODUCT_LOADED';
export const productLoaded = createAction(PRODUCT_LOADED);
