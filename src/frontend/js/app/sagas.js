import { fork } from 'redux-saga/effects';
import userSagas from '../user/userSagas';
import productSagas from '../product/productSagas';
import orderSagas from '../order/orderSagas';

export default function* () {
    yield fork(userSagas);
    yield fork(productSagas);
    yield fork(orderSagas);
}
