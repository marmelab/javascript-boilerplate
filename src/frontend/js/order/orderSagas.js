import { call, fork, put, take } from 'redux-saga/effects';
import orderActions, { orderActionTypes } from './orderActions';
import { fetchOrder, fetchOrders, fetchNewOrder as fetchNewOrderAPI } from './orderApi';
import { loadListFactory, loadItemFactory } from '../app/entities/sagas';
import { routeActions } from 'react-router-redux';

export const loadOrders = loadListFactory(orderActionTypes, orderActions);
export const loadOrder = loadItemFactory(orderActionTypes, orderActions);

export const newOrder = function* (fetchNewOrder, getState) {
    yield take(orderActionTypes.order.REQUEST);

    const state = getState();
    const { error, order } = yield call(fetchNewOrder, state.shoppingCart.products, state.user.token);

    if (error) {
        console.error(error.message);
        yield put(orderActions.order.failure(error));
    } else {
        yield put(orderActions.order.success(order));
        yield put(routeActions.push(`/orders/${order.id}`));
    }
};

const sagas = function* sagas(getState) {
    yield fork(loadOrders, fetchOrders, () => getState().user.token);
    yield fork(loadOrder, fetchOrder, () => getState().user.token);
    yield fork(newOrder, fetchNewOrderAPI, getState);
};

export default sagas;
