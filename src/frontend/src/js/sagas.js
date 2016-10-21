import { fork } from 'redux-saga/effects';
import userSagas from './user/sagas';
import productSagas from './product/sagas';
import orderSagas from './order/sagas';

export default function* () {
    yield fork(userSagas);
    yield fork(productSagas);
    yield fork(orderSagas);
}
