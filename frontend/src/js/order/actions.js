import { createAction } from 'redux-actions';
import createFetchActionTypes from 'isomorphic/fetch/createFetchActionTypes';

export const orderActionTypes = {
    list: createFetchActionTypes('ORDERS'),
    item: createFetchActionTypes('ORDER'),
    order: createFetchActionTypes('NEW_ORDER'),
};

export default {
    list: {
        request: createAction(orderActionTypes.list.REQUEST),
        success: createAction(orderActionTypes.list.SUCCESS),
        failure: createAction(orderActionTypes.list.FAILURE),
    },
    item: {
        request: createAction(orderActionTypes.item.REQUEST, id => ({ id })),
        success: createAction(orderActionTypes.item.SUCCESS),
        failure: createAction(orderActionTypes.item.FAILURE),
    },
    order: {
        request: createAction(orderActionTypes.order.REQUEST, products => ({ body: { products } })),
        success: createAction(orderActionTypes.order.SUCCESS),
        failure: createAction(orderActionTypes.order.FAILURE),
    },
};
