import { call, put, take } from 'redux-saga/effects';

export const loadListFactory = (actionTypes, actions) => function* loadList(fetchList, jwtAccessor) {
    while(true) {
        yield take(actionTypes.list.REQUEST);
        const { error, list } = yield call(fetchList, typeof jwtAccessor === 'function' ? jwtAccessor() : undefined);

        if (error) {
            console.error(error.message);
            yield put(actions.list.failure(error));
        } else {
            yield put(actions.list.success(list));
        }
    }
};

export const loadItemFactory = (actionTypes, actions) => function* loadItem(fetchItem, jwtAccessor) {
    while(true) {
        const { payload } = yield take(actionTypes.item.REQUEST);
        const { error, item } = yield call(fetchItem, payload, typeof jwtAccessor === 'function' ? jwtAccessor() : undefined);

        if (error) {
            console.error(error.message);
            yield put(actions.item.failure(error));
        } else {
            yield put(actions.item.success(item));
        }
    }
};
