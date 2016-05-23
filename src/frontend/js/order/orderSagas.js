import { takeEvery } from 'redux-saga';
import { routerActions } from 'react-router-redux';
import { call, fork, put } from 'redux-saga/effects';

import orderActions, { orderActionTypes } from './orderActions';
import { clearShoppingCart } from '../shoppingcart/shoppingCartActions';
import { entityFactory } from '../app/entities/sagas';

import {
    fetchOrder,
    fetchOrders,
    fetchNewOrder as fetchNewOrderApi,
} from './orderApi';

export const newOrder = (fetchNewOrder, jwtAccessor) => function* newOrderSaga({ payload }) {
    const {
        error,
        order,
    } = yield call(fetchNewOrder, payload, jwtAccessor());

    if (error) {
        console.error({ error }); // eslint-disable-line no-console
        yield put(orderActions.order.failure(error));
    } else {
        yield put(orderActions.order.success(order));
        yield put(clearShoppingCart());
        yield put(routerActions.push(`/orders/${order.id}`));
    }
};

const sagas = function* sagas(getState) {
    const jwtAccessor = () => getState().user.token;
    yield fork(entityFactory(orderActionTypes, orderActions, fetchOrders, fetchOrder, jwtAccessor));
    yield* takeEvery(orderActionTypes.order.REQUEST, newOrder(fetchNewOrderApi, jwtAccessor));
};

export default sagas;
