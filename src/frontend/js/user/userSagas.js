import { call, fork, put, take } from 'redux-saga';
import { LOGIN, LOGOUT, loginError, signedIn, signedOut } from './userActions';
import { routeActions } from 'react-router-redux';
import { fetchLogin as apiFetchLogin, storeLocalUser as apiStoreLocalUser, removeLocalUser as apiRemoveLocalUser } from './userApi';

export const login = function* login(fetchLogin, storeLocalUser) {
    while (true) {
        const { payload: { email, password, previousRoute }} = yield take(LOGIN);
        const { error, user, status } = yield call(fetchLogin, email, password);

        if (status === 200) {
            yield call(storeLocalUser, user);
            yield put(signedIn(user));
            yield put(routeActions.push(previousRoute));
        } else {
            yield put(loginError(error));
        }
    }
};

export const logout = function* logout(removeLocalUser) {
    while (true) {
        yield take(LOGOUT);
        yield call(removeLocalUser);
        yield put(signedOut());
        yield put(routeActions.push('/'));
    }
};

const sagas = function* sagas() {
    yield fork(login, apiFetchLogin, apiStoreLocalUser);
    yield fork(logout, apiRemoveLocalUser);
};

export default sagas;
