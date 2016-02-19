import { fork } from 'redux-saga/effects';
import productActions, { productActionTypes } from './productActions';
import { fetchProduct, fetchProducts } from './productApi';
import { loadListFactory, loadItemFactory } from '../app/entities/sagas';

export const loadProducts = loadListFactory(productActionTypes, productActions);
export const loadProduct = loadItemFactory(productActionTypes, productActions);

const sagas = function* sagas() {
    yield fork(loadProducts, fetchProducts);
    yield fork(loadProduct, fetchProduct);
};

export default sagas;
