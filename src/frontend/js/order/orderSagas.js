import { fork } from 'redux-saga/effects';
import orderActions, { orderActionTypes } from './orderActions';
import { fetchOrder, fetchOrders } from './orderApi';
import { loadListFactory, loadItemFactory } from '../app/entities/sagas';

export const loadOrders = loadListFactory(orderActionTypes, orderActions);
export const loadOrder = loadItemFactory(orderActionTypes, orderActions);

const sagas = function* sagas(getState) {
    yield fork(loadOrders, fetchOrders, () => getState().user.token);
    yield fork(loadOrder, fetchOrder, () => getState().user.token);
};

export default sagas;
