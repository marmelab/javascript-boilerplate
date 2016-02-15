import { fork } from 'redux-saga';
import userSagas from '../user/userSagas';
import orderSagas from '../order/orderSagas';

export default function* () {
    yield fork(userSagas);
    yield fork(orderSagas);
}
