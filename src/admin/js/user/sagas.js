import { routerActions } from 'react-router-redux';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import decodeJwt from 'jwt-decode';
import { FAILURE } from '../../../isomorphic/fetch/createFetchActionTypes';
import { fetchSagaFactory } from '../../../isomorphic/fetch/sagas';

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
    const user = yield call(getUserFromToken, result.token);

    if (!error) {
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

const sagas = function* sagas() {
    yield [
        takeLatest(userActionTypes.signIn.REQUEST, signIn(fetchSagaFactory(signInActions, fetchSignInApi), storeLocalUserApi)),
        takeLatest(userActionTypes.signOut.REQUEST, signOut(removeLocalUserApi)),
    ];
};

export default sagas;
