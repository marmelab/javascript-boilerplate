import { routerActions } from 'react-router-redux';
import { call, fork, put, take } from 'redux-saga/effects';
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

export const signIn = function* signIn(fetchSignIn, storeLocalUser) {
    while (true) { // eslint-disable-line no-constant-condition
        const {
            payload: { email, password, previousRoute },
        } = yield take(userActionTypes.signIn.REQUEST);
        const { error, user } = yield call(fetchSignIn, email, password);
        if (error) {
            yield put(signInActions.failure(error));
        } else {
            yield call(storeLocalUser, user);
            yield put(signInActions.success(user));
            yield put(routerActions.push(previousRoute));
        }
    }
};

export const signUp = function* signUp(fetchSignUp, storeLocalUser) {
    while (true) { // eslint-disable-line no-constant-condition
        const {
            payload: { email, password, previousRoute },
        } = yield take(userActionTypes.signUp.REQUEST);
        const { error, user } = yield call(fetchSignUp, email, password);
        if (error) {
            yield put(signUpActions.failure(error));
        } else {
            yield call(storeLocalUser, user);
            yield put(signUpActions.success(user));
            yield put(routerActions.push(previousRoute));
        }
    }
};

export const signOut = function* signOut(removeLocalUser) {
    while (true) { // eslint-disable-line no-constant-condition
        yield take(userActionTypes.signOut.REQUEST);
        yield call(removeLocalUser);
        yield put(signOutActions.success());
        yield put(routerActions.push('/'));
    }
};

const sagas = function* sagas() {
    yield fork(signIn, fetchSignInApi, storeLocalUserApi);
    yield fork(signUp, fetchSignUpApi, storeLocalUserApi);
    yield fork(signOut, removeLocalUserApi);
};

export default sagas;
