import { LOAD_ORDERS, ORDERS_LOADED } from './orderActions';

const initialState = {
    orders: [],
    order: {},
    error: false,
    loading: false,
};

export default (state = initialState, { type, payload, error }) => {
    switch (type) {
    case LOAD_ORDERS:
        return {
            ...state,
            loading: true,
        };

    case ORDERS_LOADED:
        if (!error) {
            return {
                ...state,
                orders: payload,
                error: false,
                loading: false,
            };
        }

        return {
            ...state,
            orders: [],
            error: payload,
            loading: false,
        };

    default:
        return state;
    }
};
