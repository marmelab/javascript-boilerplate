import { routerActions } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import orderActions, { orderActionTypes } from './orderActions';
import {
    fetchOrder as fetchOrderApi,
    fetchOrders as fetchOrdersApi,
    fetchNewOrder as fetchNewOrderAPI,
} from './orderApi';
import { loadListFactory, loadItemFactory } from '../app/entities/sagas';
import { clearShoppingCart } from '../shoppingcart/shoppingCartActions';

export const loadOrders = (fetchOrders, jwtAccessor) =>
    loadListFactory(orderActionTypes, orderActions, fetchOrders, jwtAccessor);

export const loadOrder = (fetchOrder, jwtAccessor) =>
    loadItemFactory(orderActionTypes, orderActions, fetchOrder, jwtAccessor);

export const newOrder = (fetchNewOrder, getState) => function* newOrderSaga() {
    const state = getState();
    const {
        error,
        order,
    } = yield call(fetchNewOrder, state.shoppingCart.products, state.user.token);

    if (error) {
        console.error(error.message);
        yield put(orderActions.order.failure(error));
    } else {
        yield put(orderActions.order.success(order));
        yield put(clearShoppingCart());
        yield put(routerActions.push(`/orders/${order.id}`));
    }
};

const sagas = function* sagas(getState) {
    const jwtAccessor = () => getState().user.token;
    yield [
        takeLatest(orderActionTypes.list.REQUEST, loadOrders(fetchOrdersApi, jwtAccessor)),
        takeLatest(orderActionTypes.item.REQUEST, loadOrder(fetchOrderApi, jwtAccessor)),
        takeLatest(orderActionTypes.order.REQUEST, newOrder(fetchNewOrderAPI, getState)),
    ];
};

export default sagas;
