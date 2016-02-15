import { call, fork, put, take } from 'redux-saga/effects';
import { LOAD_PRODUCTS, productsLoaded } from './productActions';
import { fetchProducts as apiFetchProducts } from './productApi';

export const loadProducts = function* loadOrders(fetchProducts) {
    while(true) {
        yield take(LOAD_PRODUCTS);
        const { error, products } = yield call(fetchProducts);

        if (error) {
            yield put(productsLoaded(error));
        } else {
            yield put(productsLoaded(products));
        }
    }
};

const sagas = function* sagas() {
    yield fork(loadProducts, apiFetchProducts);
};

export default sagas;
