import { routerActions } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import decodeJwt from 'jwt-decode';
import { fetchSagaFactory } from '../../../common/fetch/sagas';

import {
    fetchSignIn as fetchSignInApi,
    removeLocalUser as removeLocalUserApi,
    storeLocalUser as storeLocalUserApi,
} from './api';
import {
    signIn as signInActions,
    signOut as signOutActions,
    userActionTypes,
} from './actions';

export const getUserFromToken = (token) => {
    const tokenData = decodeJwt(token);

    return { ...tokenData, token, expires: new Date(tokenData.exp * 1000) };
};

export const signIn = (fetchSaga, storeLocalUser) => function* signInSaga({ payload: { previousRoute, ...payload } }) {
    const { error, result } = yield call(fetchSaga, { payload });

    if (!error) {
        const user = yield call(getUserFromToken, result.token);
        yield put(signInActions.success(user));
        yield call(storeLocalUser, user);
        yield put(routerActions.push(previousRoute));
    }
};

export const signOut = removeLocalUser => function* signOutSaga() {
    yield call(removeLocalUser);
    yield put(signOutActions.success());
    yield put(routerActions.push('/sign-in'));
};

export const getCurrentRoute = ({ routing: { locationBeforeTransitions: { pathname } } }) => pathname;

function* watchSignInRequest() {
    const saga = signIn(fetchSagaFactory(signInActions, fetchSignInApi), storeLocalUserApi);
    yield takeLatest(userActionTypes.signIn.REQUEST, saga);
}

function* watchSignOutRequest() {
    yield takeLatest(userActionTypes.signOut.REQUEST, signOut(removeLocalUserApi));
}

export default function* sagas() {
    yield fork(watchSignInRequest);
    yield fork(watchSignOutRequest);
}
