import { ORDERS_LOADED } from './orderActions';

const initialState = {
    orders: [],
    order: {},
    error: false,
};

export default (state = initialState, { type, payload, error }) => {
    switch (type) {
    case ORDERS_LOADED:
        if (!error) {
            return {
                ...state,
                orders: payload,
                error: false,
            };
        }

        return {
            ...state,
            orders: [],
            error: payload,
        };

    default:
        return state;
    }
};
