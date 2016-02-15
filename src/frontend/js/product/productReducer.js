import { LOAD_PRODUCTS, PRODUCTS_LOADED } from './productActions';

const initialState = {
    products: [],
    product: {},
    error: false,
    loading: false,
};

export default (state = initialState, { type, payload, error }) => {
    switch (type) {
    case LOAD_PRODUCTS:
        return {
            ...state,
            loading: true,
        };

    case PRODUCTS_LOADED:
        if (!error) {
            return {
                ...state,
                products: payload,
                error: false,
                loading: false,
            };
        }

        return {
            ...state,
            products: [],
            error: payload,
            loading: false,
        };

    default:
        return state;
    }
};
