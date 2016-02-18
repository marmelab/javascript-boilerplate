import { call, fork, put, take } from 'redux-saga/effects';
import { LOAD_PRODUCT, productLoaded, LOAD_PRODUCTS, productsLoaded } from './productActions';
import { fetchProduct as apiFetchProduct, fetchProducts as apiFetchProducts } from './productApi';

export const loadProducts = function* loadProducts(fetchProducts) {
    while(true) {
        yield take(LOAD_PRODUCTS);
        const { error, products } = yield call(fetchProducts);

        if (error) {
            console.error(error.message);
            yield put(productsLoaded(error));
        } else {
            yield put(productsLoaded(products));
        }
    }
};

export const loadProduct = function* loadProduct(fetchProduct) {
    while(true) {
        const { payload } = yield take(LOAD_PRODUCT);
        const { error, product } = yield call(fetchProduct, payload);

        if (error) {
            console.error(error.message);
            yield put(productLoaded(error));
        } else {
            yield put(productLoaded(product));
        }
    }
};

const sagas = function* sagas() {
    yield fork(loadProducts, apiFetchProducts);
    yield fork(loadProduct, apiFetchProduct);
};

export default sagas;
