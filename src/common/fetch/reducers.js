export const initialStateForList = {
    error: null,
    list: [],
    loading: false,
};

/**
 * The created reducer will handle fetch actions returning an array.
 * The fetched data will be stored in the `list` property.
 *
 * @example
 * import createFetchActionTypes from 'common-client/createFetchActionTypes';
 * import { createListReducer } from 'common-client/reducers';
 * const productsActionTypes = createFetchActionTypes('PRODUCTS');
 *
 * const productsReducer = createListReducer(productsActionTypes);
 * const state = productsReducer(undefined, { type: '@@init' });
 * console.log(state);
 *
 * // Will output:
 * { error: null, list: [], loading: false }
 */
export const createListReducer = actionTypes =>
    (state = initialStateForList, { type, payload }) => {
        switch (type) {
        case actionTypes.REQUEST:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.SUCCESS:
            return {
                ...state,
                list: payload,
                error: null,
                loading: false,
            };

        case actionTypes.FAILURE:
            return {
                ...state,
                list: [],
                error: payload,
                loading: false,
            };

        default:
            return state;
        }
    };

export const initialStateForItem = {
    error: null,
    item: null,
    loading: false,
};

/**
 * The created reducer will handle fetch actions returning a single item.
 * The fetched data will be stored in the `item` property.
 *
 * @example
 * import createFetchActionTypes from 'common-client/createFetchActionTypes';
 * import { createItemReducer } from 'common-client/reducers';
 * const productActionTypes = createFetchActionTypes('PRODUCT');
 *
 * const productReducer = createItemReducer(productActionTypes);
 * const state = productReducer(undefined, { type: '@@init' });
 * console.log(state);
 *
 * // Will output:
 * { error: null, item: null, loading: false }
 */
export const createItemReducer = actionTypes =>
    (state = initialStateForItem, { type, payload }) => {
        switch (type) {
        case actionTypes.REQUEST:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.SUCCESS:
            return {
                ...state,
                item: payload,
                error: null,
                loading: false,
            };

        case actionTypes.FAILURE:
            return {
                ...state,
                item: null,
                error: payload,
                loading: false,
            };

        default:
            return state;
        }
    };

export const initialStateForEntity = { ...initialStateForList, ...initialStateForItem };

/**
 * The created reducer will handle all fetching actions for an entity type,
 * listing the entities or getting a single item.
 *
 * @example
 * import createFetchActionTypes from 'common-client/createFetchActionTypes';
 * import { createEntityReducer } from 'common-client/reducers';
 * const productsActionTypes = {
 *     list: createFetchActionTypes('PRODUCTS'),
 *     item: createFetchActionTypes('PRODUCT'),
 * };
 *
 * const productReducer = createEntityReducer(productActionTypes);
 * const state = productReducer(undefined, { type: '@@init' });
 * console.log(state);
 *
 * // Will output:
 * { error: null, list: [], item: null, loading: false }
 */
export const createEntityReducer = (actionTypes) => {
    const listReducer = createListReducer(actionTypes.list);
    const itemReducer = createItemReducer(actionTypes.item);

    return (state = initialStateForEntity, action) => {
        let result = listReducer(state, action);
        result = itemReducer(result, action);

        return result;
    };
};
