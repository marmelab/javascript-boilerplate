import { call, put } from 'redux-saga/effects';

export const loadListFactory = (actionTypes, actions, fetchList, jwtAccessor) =>
    function* loadList() {
        const jwt = typeof jwtAccessor === 'function' ? jwtAccessor() : undefined;
        const { error, list } = yield call(fetchList, jwt);

        if (error) {
            console.error(error.message);
            yield put(actions.list.failure(error));
        } else {
            yield put(actions.list.success(list));
        }
    };

export const loadItemFactory = (actionTypes, actions, fetchItem, jwtAccessor) =>
    function* loadItem({ payload }) {
        const jwt = typeof jwtAccessor === 'function' ? jwtAccessor() : undefined;
        const { error, item } = yield call(fetchItem, payload, jwt);

        if (error) {
            console.error(error.message);
            yield put(actions.item.failure(error));
        } else {
            yield put(actions.item.success(item));
        }
    };
