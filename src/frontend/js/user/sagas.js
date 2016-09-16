import { routerActions } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { fetchSagaFactory } from '../../../common-client/fetch/sagas';

import {
    fetchSignIn as fetchSignInApi,
    fetchSignUp as fetchSignUpApi,
    removeLocalUser as removeLocalUserApi,
    storeLocalUser as storeLocalUserApi,
} from './api';
import {
    signIn as signInActions,
    signOut as signOutActions,
    signUp as signUpActions,
    userActionTypes,
} from './actions';

export const signIn = (fetchSaga, storeLocalUser) => function* signInSaga({ payload: { previousRoute, ...payload } }) {
    const { error, result } = yield call(fetchSaga, { payload });
    if (!error) {
        yield call(storeLocalUser, result);
        yield put(routerActions.push(previousRoute));
    }
};

export const signUp = (fetchSaga, storeLocalUser) => function* signUpSaga({ payload: { previousRoute, ...payload } }) {
    const { error, result } = yield call(fetchSaga, { payload });

    if (!error) {
        yield call(storeLocalUser, result);
        yield put(routerActions.push(previousRoute));
    }
};

export const signOut = removeLocalUser => function* signOutSaga() {
    yield call(removeLocalUser);
    yield put(signOutActions.success());
    yield put(routerActions.push('/'));
};

const sagas = function* sagas() {
    yield [
        takeLatest(userActionTypes.signIn.REQUEST, signIn(fetchSagaFactory(signInActions, fetchSignInApi), storeLocalUserApi)),
        takeLatest(userActionTypes.signUp.REQUEST, signUp(fetchSagaFactory(signUpActions, fetchSignUpApi), storeLocalUserApi)),
        takeLatest(userActionTypes.signOut.REQUEST, signOut(removeLocalUserApi)),
    ];
};

export default sagas;
