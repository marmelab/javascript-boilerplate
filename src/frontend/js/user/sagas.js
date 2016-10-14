import { routerActions } from 'react-router-redux';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import decodeJwt from 'jwt-decode';
import { FAILURE } from '../../../isomorphic/fetch/createFetchActionTypes';
import { fetchSagaFactory } from '../../../isomorphic/fetch/sagas';

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

export const getUserFromToken = token => ({ ...decodeJwt(token), token });

export const signIn = (fetchSaga, storeLocalUser) => function* signInSaga({ payload: { previousRoute, ...payload } }) {
    const { error, result } = yield call(fetchSaga, { payload });
    const user = yield call(getUserFromToken, result.token);

    if (!error) {
        yield put(signInActions.success(user));
        yield call(storeLocalUser, user);
        yield put(routerActions.push(previousRoute));
    }
};

export const signUp = (fetchSaga, storeLocalUser) => function* signUpSaga({ payload: { previousRoute, ...payload } }) {
    const { error, result } = yield call(fetchSaga, { payload });
    const user = yield call(getUserFromToken, result.token);

    if (!error) {
        yield put(signUpActions.success(user));
        yield call(storeLocalUser, user);
        yield put(routerActions.push(previousRoute));
    }
};

export const signOut = removeLocalUser => function* signOutSaga() {
    yield call(removeLocalUser);
    yield put(signOutActions.success());
    yield put(routerActions.push('/'));
};

export const getCurrentRoute = ({ routing: { locationBeforeTransitions: { pathname } } }) => pathname;

export const handleUnauthorizedErrors = function* handleUnauthorizedErrorsSaga({ type, payload }) {
    if (!type.includes(FAILURE)) return;

    const nextPathname = yield select(getCurrentRoute);

    if (payload.message === 'Unauthorized') {
        yield put(routerActions.replace({
            pathname: '/sign-in',
            state: { nextPathname },
        }));
    }
};

const sagas = function* sagas() {
    yield [
        takeLatest(userActionTypes.signIn.REQUEST, signIn(fetchSagaFactory(signInActions, fetchSignInApi), storeLocalUserApi)),
        takeLatest(userActionTypes.signUp.REQUEST, signUp(fetchSagaFactory(signUpActions, fetchSignUpApi), storeLocalUserApi)),
        takeLatest(userActionTypes.signOut.REQUEST, signOut(removeLocalUserApi)),
        takeEvery('*', handleUnauthorizedErrors),
    ];
};

export default sagas;
