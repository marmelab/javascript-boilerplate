import { ORDERS_LOADED } from './orderActions';

// [{
//     id: 'order1',
//     reference: 'O1',
//     date: new Date(),
//     customer_id: 1,
//     total: 29.99,
//     status: 'pending',
//
// }]

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
