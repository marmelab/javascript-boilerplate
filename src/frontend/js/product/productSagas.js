import { call, fork, put, take } from 'redux-saga/effects';
import productActions, { productActionTypes } from './productActions';
import { fetchProduct, fetchProducts, fetchOrderProduct as fetchOrderProductApi } from './productApi';
import { loadListFactory, loadItemFactory } from '../app/entities/sagas';
import { routeActions } from 'react-router-redux';

export const loadProducts = loadListFactory(productActionTypes, productActions);
export const loadProduct = loadItemFactory(productActionTypes, productActions);

// export const orderProduct = function* orderProduct(getState, fetchOrderProduct) {
//     while(true) {
//         const { payload } = yield take(productActionTypes.order.REQUEST);
//         const { error, order } = yield call(fetchOrderProduct, getState().user.token, payload);
//
//         if (error) {
//             console.error(error.message);
//             yield put(productActions.order.failure(error));
//         } else {
//             yield put(productActions.order.success(order));
//             yield put(routeActions.push(`/orders/${order.id}`));
//         }
//     }
// };

const sagas = function* sagas(getState) {
    yield fork(loadProducts, fetchProducts);
    yield fork(loadProduct, fetchProduct);
    // yield fork(orderProduct, getState, fetchOrderProductApi);
};

export default sagas;
