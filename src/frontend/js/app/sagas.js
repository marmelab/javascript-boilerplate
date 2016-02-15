import { fork } from 'redux-saga/effects';
import userSagas from '../user/userSagas';
import productSagas from '../product/productSagas';
import orderSagas from '../order/orderSagas';

export default function* (getState) {
    yield fork(userSagas, getState);
    yield fork(productSagas, getState);
    yield fork(orderSagas, getState);
}
