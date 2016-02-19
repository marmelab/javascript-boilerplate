import { call, fork, put, take } from 'redux-saga/effects';
import { routeActions } from 'react-router-redux';
import { fetchSignIn as fetchSignInApi, fetchSignUp as fetchSignUpApi, storeLocalUser as storeLocalUserApi, removeLocalUser as removeLocalUserApi } from './userApi';
import { userActionTypes, signIn as signInActions, signOut as signOutActions, signUp as signUpActions } from './userActions';

export const signIn = function* signIn(fetchSignIn, storeLocalUser) {
    while (true) {
        const { payload: { email, password, previousRoute }} = yield take(userActionTypes.signIn.REQUEST);
        const { error, user } = yield call(fetchSignIn, email, password);
        if (error) {
            yield put(signInActions.failure(error));
        } else {
            yield call(storeLocalUser, user);
            yield put(signInActions.success(user));
            yield put(routeActions.push(previousRoute));
        }
    }
};

export const signUp = function* signUp(fetchSignUp, storeLocalUser) {
    while (true) {
        const { payload: { email, password, previousRoute }} = yield take(userActionTypes.signUp.REQUEST);
        const { error, user } = yield call(fetchSignUp, email, password);
        if (error) {
            yield put(signUpActions.failure(error));
        } else {
            yield call(storeLocalUser, user);
            yield put(signUpActions.success(user));
            yield put(routeActions.push(previousRoute));
        }
    }
};

export const signOut = function* signOut(removeLocalUser) {
    while (true) {
        yield take(userActionTypes.signOut.REQUEST);
        yield call(removeLocalUser);
        yield put(signOutActions.success());
        yield put(routeActions.push('/'));
    }
};

const sagas = function* sagas() {
    yield fork(signIn, fetchSignInApi, storeLocalUserApi);
    yield fork(signUp, fetchSignUpApi, storeLocalUserApi);
    yield fork(signOut, removeLocalUserApi);
};

export default sagas;
