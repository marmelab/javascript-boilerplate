import { createAction } from 'redux-actions';
import createRequestActionTypes from '../app/entities/createRequestActionTypes';

export const productActionTypes = {
    item: createRequestActionTypes('PRODUCT'),
    list: createRequestActionTypes('PRODUCTS'),
};

export default {
    item: {
        request: createAction(productActionTypes.item.REQUEST),
        success: createAction(productActionTypes.item.SUCCESS),
        failure: createAction(productActionTypes.item.FAILURE),
    },
    list: {
        request: createAction(productActionTypes.list.REQUEST),
        success: createAction(productActionTypes.list.SUCCESS),
        failure: createAction(productActionTypes.list.FAILURE),
    },
};
