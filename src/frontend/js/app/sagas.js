import { fork } from 'redux-saga/effects';
import userSagas from '../user/userSagas';
import orderSagas from '../order/orderSagas';

export default function* (getState) {
    yield fork(userSagas, getState);
    yield fork(orderSagas, getState);
}
