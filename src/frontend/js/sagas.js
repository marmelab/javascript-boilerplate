import { fork } from 'redux-saga/effects';
import userSagas from './user/sagas';

export default function (apolloClient) {
    return function* () {
        yield fork(userSagas(apolloClient));
    };
}
