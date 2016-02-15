import { call, fork, put, take } from 'redux-saga';
import { SIGN_IN, SIGN_OUT, signedIn, signedOut } from './userActions';
import { routeActions } from 'react-router-redux';
import { fetchLogin as apiFetchLogin, storeLocalUser as apiStoreLocalUser, removeLocalUser as apiRemoveLocalUser } from './userApi';

export const signIn = function* signIn(fetchLogin, storeLocalUser) {
    while (true) {
        const { payload: { email, password, previousRoute }} = yield take(SIGN_IN);
        const { error, user } = yield call(fetchLogin, email, password);

        if (error) {
            yield put(signedIn(error));
        } else {
            yield call(storeLocalUser, user);
            yield put(signedIn(user));
            yield put(routeActions.push(previousRoute));
        }
    }
};

export const signOut = function* signOut(removeLocalUser) {
    while (true) {
        yield take(SIGN_OUT);
        yield call(removeLocalUser);
        yield put(signedOut());
        yield put(routeActions.push('/'));
    }
};

const sagas = function* sagas() {
    yield fork(signIn, apiFetchLogin, apiStoreLocalUser);
    yield fork(signOut, apiRemoveLocalUser);
};

export default sagas;
