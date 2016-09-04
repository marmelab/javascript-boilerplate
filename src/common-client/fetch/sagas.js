import { takeEvery } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';

export const fetchSagaFactory = (actions, fetch, jwtSelector = () => null) =>
    function* fetchSaga({ payload }) {
        const jwt = yield select(jwtSelector);
        const { error, result } = yield call(fetch, { jwt, ...payload });

        if (error) {
            console.error({ error }); // eslint-disable-line no-console
            yield put(actions.failure(error));
        } else {
            yield put(actions.success(result));
        }

        return { error, result };
    };

export const takeEveryRequestSagaFactory = (actionTypes, actions, fetch, jwtSelector) =>
    function* sagas() {
        yield* takeEvery(
            actionTypes.REQUEST,
            fetchSagaFactory(actions, fetch, jwtSelector)
        );
    };

export const entityFactory = (actionTypes, actions, fetchList, fetchItem, jwtSelector) =>
    function* sagas() {
        yield fork(takeEveryRequestSagaFactory(actionTypes.list, actions.list, fetchList, jwtSelector));
        yield fork(takeEveryRequestSagaFactory(actionTypes.item, actions.item, fetchItem, jwtSelector));
    };
