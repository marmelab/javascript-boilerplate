import { routerActions } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
    fetchSignIn as fetchSignInApi,
    fetchSignUp as fetchSignUpApi,
    removeLocalUser as removeLocalUserApi,
    storeLocalUser as storeLocalUserApi,
} from './userApi';
import {
    signIn as signInActions,
    signOut as signOutActions,
    signUp as signUpActions,
    userActionTypes,
} from './userActions';

export const signIn = (fetchSignIn, storeLocalUser) => function* signInSaga({
    payload: { email, password, previousRoute },
}) {
    const { error, user } = yield call(fetchSignIn, email, password);
    if (error) {
        yield put(signInActions.failure(error));
    } else {
        yield call(storeLocalUser, user);
        yield put(signInActions.success(user));
        yield put(routerActions.push(previousRoute));
    }
};

export const signUp = (fetchSignUp, storeLocalUser) => function* signUpSaga({
    payload: { email, password, previousRoute },
}) {
    const { error, user } = yield call(fetchSignUp, email, password);
    if (error) {
        yield put(signUpActions.failure(error));
    } else {
        yield call(storeLocalUser, user);
        yield put(signUpActions.success(user));
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
        takeLatest(userActionTypes.signIn.REQUEST, signIn(fetchSignInApi, storeLocalUserApi)),
        takeLatest(userActionTypes.signUp.REQUEST, signUp(fetchSignUpApi, storeLocalUserApi)),
        takeLatest(userActionTypes.signOut.REQUEST, signOut(removeLocalUserApi)),
    ];
};

export default sagas;
