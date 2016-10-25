import { createAction } from 'redux-actions';
import createFetchActionTypes from '../../../common/fetch/createFetchActionTypes';

export const productActionTypes = {
    item: createFetchActionTypes('PRODUCT'),
    list: createFetchActionTypes('PRODUCTS'),
};

export default {
    item: {
        request: createAction(productActionTypes.item.REQUEST, id => ({ id })),
        success: createAction(productActionTypes.item.SUCCESS),
        failure: createAction(productActionTypes.item.FAILURE),
    },
    list: {
        request: createAction(productActionTypes.list.REQUEST),
        success: createAction(productActionTypes.list.SUCCESS),
        failure: createAction(productActionTypes.list.FAILURE),
    },
};
