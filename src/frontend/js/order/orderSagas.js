import { takeEvery } from 'redux-saga';
import { routerActions } from 'react-router-redux';
import { call, fork, put, select } from 'redux-saga/effects';

import orderActions, { orderActionTypes } from './orderActions';
import { clearShoppingCart } from '../shoppingcart/shoppingCartActions';
import { entityFactory } from '../app/entities/sagas';
import jwtSelector from '../app/jwtSelector';

import {
    fetchOrder,
    fetchOrders,
    fetchNewOrder as fetchNewOrderApi,
} from './orderApi';

export const newOrder = (fetchNewOrder) => function* newOrderSaga({ payload }) {
    const jwt = yield select(jwtSelector);
    const {
        error,
        order,
    } = yield call(fetchNewOrder, payload, jwt);

    if (error) {
        console.error({ error }); // eslint-disable-line no-console
        yield put(orderActions.order.failure(error));
    } else {
        yield put(orderActions.order.success(order));
        yield put(clearShoppingCart());
        yield put(routerActions.push(`/orders/${order.id}`));
    }
};

const sagas = function* sagas() {
    yield fork(entityFactory(orderActionTypes, orderActions, fetchOrders, fetchOrder, jwtSelector));
    yield* takeEvery(orderActionTypes.order.REQUEST, newOrder(fetchNewOrderApi));
};

export default sagas;
