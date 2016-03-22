import { takeLatest } from 'redux-saga';
import productActions, { productActionTypes } from './productActions';
import { fetchProduct as fetchProductApi, fetchProducts as fetchProductsApi } from './productApi';
import { loadListFactory, loadItemFactory } from '../app/entities/sagas';

export const loadProducts = fetchProducts =>
    loadListFactory(productActionTypes, productActions, fetchProducts);

export const loadProduct = fetchProduct =>
    loadItemFactory(productActionTypes, productActions, fetchProduct);

const sagas = function* sagas() {
    yield [
        takeLatest(productActionTypes.item.REQUEST, loadProduct(fetchProductApi)),
        takeLatest(productActionTypes.list.REQUEST, loadProducts(fetchProductsApi)),
    ];
};

export default sagas;
