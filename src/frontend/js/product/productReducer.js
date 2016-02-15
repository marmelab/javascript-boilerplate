import { LOAD_PRODUCT, PRODUCT_LOADED, LOAD_PRODUCTS, PRODUCTS_LOADED } from './productActions';

const initialState = {
    products: [],
    product: undefined,
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

    case LOAD_PRODUCT:
        return {
            ...state,
            loading: true,
        };

    case PRODUCT_LOADED:
        if (!error) {
            return {
                ...state,
                product: payload,
                error: false,
                loading: false,
            };
        }

        return {
            ...state,
            product: undefined,
            error: payload,
            loading: false,
        };

    default:
        return state;
    }
};
