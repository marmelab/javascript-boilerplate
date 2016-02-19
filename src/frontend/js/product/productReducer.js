import { productActionTypes } from './productActions';

const initialState = {
    list: [],
    item: undefined,
    error: false,
    loading: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case productActionTypes.list.REQUEST:
    case productActionTypes.item.REQUEST:
        return {
            ...state,
            loading: true,
        };

    case productActionTypes.list.SUCCESS:
        return {
            ...state,
            list: payload,
            error: false,
            loading: false,
        };

    case productActionTypes.list.FAILURE:
        return {
            ...state,
            list: [],
            error: payload,
            loading: false,
        };

    case productActionTypes.item.SUCCESS:
        return {
            ...state,
            item: payload,
            error: false,
            loading: false,
        };

    case productActionTypes.item.FAILURE:
        return {
            ...state,
            item: undefined,
            error: payload,
            loading: false,
        };

    default:
        return state;
    }
};
