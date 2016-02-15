import { call, fork, put, take } from 'redux-saga/effects';
import { LOAD_ORDERS, ordersLoaded } from './orderActions'
import { fetchOrders as apiFetchOrders } from './orderApi';

export const loadOrders = function* loadOrders(fetchOrders, getState) {
    while(true) {
        yield take(LOAD_ORDERS);
        const state = getState();
        const { error, orders, status } = yield call(fetchOrders, state.user.token);

        if (status === 200) {
            yield put(ordersLoaded(orders));
        } else {
            yield put(ordersLoaded(error));
        }
    }
};

const sagas = function* sagas(getState) {
    yield fork(loadOrders, apiFetchOrders, getState);
};

export default sagas;
