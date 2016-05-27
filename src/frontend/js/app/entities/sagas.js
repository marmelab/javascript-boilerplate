import { takeEvery } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

export const loadListFactory = (actions, fetchList, jwtAccessor) =>
    function* loadList() {
        const jwt = typeof jwtAccessor === 'function' ? jwtAccessor() : undefined;
        const { error, list } = yield call(fetchList, jwt);

        if (error) {
            console.error({ error }); // eslint-disable-line no-console
            yield put(actions.failure(error));
        } else {
            yield put(actions.success(list));
        }
    };

export const loadItemFactory = (actions, fetchItem, jwtAccessor) =>
    function* loadItem({ payload }) {
        const jwt = typeof jwtAccessor === 'function' ? jwtAccessor() : undefined;
        const { error, item } = yield call(fetchItem, payload, jwt);

        if (error) {
            console.error({ error }); // eslint-disable-line no-console
            yield put(actions.failure(error));
        } else {
            yield put(actions.success(item));
        }
    };

export const entityListFactory = (actionTypes, actions, fetchList, jwtAccessor) =>
    function* sagas() {
        yield* takeEvery(
            actionTypes.REQUEST,
            loadListFactory(actions, fetchList, jwtAccessor)
        );
    };

export const entityItemFactory = (actionTypes, actions, fetchItem, jwtAccessor) =>
    function* sagas() {
        yield* takeEvery(
            actionTypes.REQUEST,
            loadItemFactory(actions, fetchItem, jwtAccessor)
        );
    };

export const entityFactory = (actionTypes, actions, fetchList, fetchItem, jwtAccessor) =>
    function* sagas() {
        yield fork(entityListFactory(actionTypes.list, actions.list, fetchList, jwtAccessor));
        yield fork(entityItemFactory(actionTypes.item, actions.item, fetchItem, jwtAccessor));
    };
