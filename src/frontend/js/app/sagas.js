import { fork } from 'redux-saga'
import userSagas from '../user/userSagas';

export default function* () {
    yield fork(userSagas);
}
