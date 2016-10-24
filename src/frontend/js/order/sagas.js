/* eslint func-names: off */
import { takeEvery } from 'redux-saga';
import { routerActions } from 'react-router-redux';
import { call, fork, put } from 'redux-saga/effects';

import orderActions, { orderActionTypes } from './actions';
import { clearShoppingCart } from '../shoppingcart/actions';
import { createEntitySagas, fetchSagaFactory } from '../../../common/fetch/sagas';
import jwtSelector from '../jwtSelector';

import {
    fetchOrder,
    fetchOrders,
    fetchNewOrder as fetchNewOrderApi,
} from './api';

export const newOrderSaga = fetchNewOrderSaga => function* ({ payload }) {
    const { error, result } = yield call(fetchNewOrderSaga, { payload });

    if (!error) {
        yield put(clearShoppingCart());
        yield put(routerActions.push(`/orders/${result.id}`));
    }
};

export const watchNewOrderSaga = fetchNewOrderSaga => function* () {
    yield* takeEvery(orderActionTypes.order.REQUEST, newOrderSaga(fetchNewOrderSaga));
};

const sagas = function* sagas() {
    yield fork(createEntitySagas(orderActionTypes, orderActions, fetchOrders, fetchOrder, jwtSelector));
    const fetchNewOrderSaga = fetchSagaFactory(orderActions.order, fetchNewOrderApi, jwtSelector);
    yield fork(watchNewOrderSaga(fetchNewOrderSaga));
};

export default sagas;
