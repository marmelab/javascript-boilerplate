import { call, fork, put, take } from 'redux-saga/effects';
import { LOAD_ORDERS, ordersLoaded } from './orderActions'
import { fetchOrders as apiFetchOrders } from './orderApi';

export const loadOrders = function* loadOrders(fetchOrders, getState) {
    while(true) {
        yield take(LOAD_ORDERS);
        const state = getState();
        const { error, orders } = yield call(fetchOrders, state.user.token);

        if (error) {
            yield put(ordersLoaded(error));
        } else {
            yield put(ordersLoaded(orders));
        }
    }
};

const sagas = function* sagas(getState) {
    yield fork(loadOrders, apiFetchOrders, getState);
};

export default sagas;
