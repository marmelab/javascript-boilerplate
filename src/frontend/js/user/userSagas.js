import { call, fork, put, take } from 'redux-saga/effects';
import { routeActions } from 'react-router-redux';
import { fetchLogin as apiFetchLogin, storeLocalUser as apiStoreLocalUser, removeLocalUser as apiRemoveLocalUser } from './userApi';
import { userActionTypes, signIn as signInAction, signOut as signOutAction } from './userActions';

export const signIn = function* signIn(fetchLogin, storeLocalUser) {
    while (true) {
        const { payload: { email, password, previousRoute }} = yield take(userActionTypes.signIn.REQUEST);
        const { error, user } = yield call(fetchLogin, email, password);
        if (error) {
            yield put(signInAction.failure(error));
        } else {
            yield call(storeLocalUser, user);
            yield put(signInAction.success(user));
            yield put(routeActions.push(previousRoute));
        }
    }
};

export const signOut = function* signOut(removeLocalUser) {
    while (true) {
        yield take(userActionTypes.signOut.REQUEST);
        yield call(removeLocalUser);
        yield put(signOutAction.success());
        yield put(routeActions.push('/'));
    }
};

const sagas = function* sagas() {
    yield fork(signIn, apiFetchLogin, apiStoreLocalUser);
    yield fork(signOut, apiRemoveLocalUser);
};

export default sagas;
