import { takeEvery } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';

/**
 * Returns a saga which will handle fetch actions.
 * The generated saga will run on REQUEST actions and dispatch the SUCCESS or FAILURE actions when appropriate.
 *
 * You can optionnaly supply a selector function to get a JWT which will be sent correctly with fetch.
 * @example
 * // productActions is an object with request, success and failure action creators.
 * // productActionTypes is an object having REQUEST, SUCCESS and FAILURE constants for types.
 * import productActions, { productActionTypes } from './actions';
 * import { takeEveryRequestSagaFactory } from 'common-client/fetch/sagas';
 *
 * export default fetchSagaFactory(
 *     productActions.
 *     fetchFactory('product')
 * );
 */
export const fetchSagaFactory = (actions, fetch, jwtSelector = () => null) =>
    function* fetchSaga({ payload }) {
        const jwt = yield select(jwtSelector);
        const { error, result } = yield call(fetch, { jwt, ...payload });

        if (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error({ error }); // eslint-disable-line no-console
            }
            yield put(actions.failure(error));
        } else {
            yield put(actions.success(result));
        }

        return { error, result };
    };

/**
 * Returns a saga which will handle fetch request actions.
 * The generated saga will run on REQUEST actions and execute the fetch sagas.
 *
 * You can optionnaly supply a selector function to get a JWT which will be sent correctly with fetch.
 * @example
 * // productActions is an object with request, success and failure action creators.
 * // productActionTypes is an object having REQUEST, SUCCESS and FAILURE constants for types.
 * import productActions, { productActionTypes } from './actions';
 * import { takeEveryRequestSagaFactory } from 'common-client/fetch/sagas';
 *
 * export default takeEveryRequestSagaFactory(
 *     productActionTypes,
 *     productActions.
 *     fetchFactory('product')
 * );
 */
export const takeEveryRequestSagaFactory = (actionTypes, actions, fetch, jwtSelector) =>
    function* sagas() {
        yield* takeEvery(
            actionTypes.REQUEST,
            fetchSagaFactory(actions, fetch, jwtSelector)
        );
    };

/**
 * Returns a saga which will handle item and list actions.
 * The generated sagas will run on REQUEST actions and dispatch the SUCCESS or FAILURE actions when appropriate.
 *
 * You can optionnaly supply a selector function to get a JWT which will be sent correctly with fetch.
 *
 * @example
 * // productActions is an object with item and list properties, each having
 * // request, success and failure action creators.
 * // productActionTypes is an object with item and list properties, each having
 * // REQUEST, SUCCESS and FAILURE constants for types.
 * import productActions, { productActionTypes } from './actions';
 * import fetchFactory from 'common-client/fetch/fetch';
 * import { createEntitySagas } from 'common-client/fetch/sagas';
 *
 * export default createEntitySagas(
 *     productActionTypes,
 *     productActions,
 *     fetchFactory('products'),
 *     fetchFactory('product')
 * );
 */
export const createEntitySagas = (actionTypes, actions, fetchList, fetchItem, jwtSelector) =>
    function* sagas() {
        yield fork(takeEveryRequestSagaFactory(actionTypes.list, actions.list, fetchList, jwtSelector));
        yield fork(takeEveryRequestSagaFactory(actionTypes.item, actions.item, fetchItem, jwtSelector));
    };
