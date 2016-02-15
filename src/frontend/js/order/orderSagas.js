import { call, fork, put, take } from 'redux-saga';
import { LOAD_ORDERS, ordersLoaded } from './orderActions';
import { fetchOrders as apiFetchOrders } from './orderApi';

export const loadOrders = function* loadOrders(fetchOrders) {
    while (true) {
        yield take(LOAD_ORDERS);
        const { error, orders, status } = yield call(fetchOrders);

        if (status === 200) {
            yield put(ordersLoaded(orders));
        } else {
            yield put(ordersLoaded(error));
        }
    }
};

const sagas = function* sagas() {
    yield fork(loadOrders, apiFetchOrders);
};

export default sagas;
