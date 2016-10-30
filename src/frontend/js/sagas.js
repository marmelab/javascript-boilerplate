import { fork } from 'redux-saga/effects';
import userSagas from './user/sagas';

export default function* () {
    yield fork(userSagas);
}
