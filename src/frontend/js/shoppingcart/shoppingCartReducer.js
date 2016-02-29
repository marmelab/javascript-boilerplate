import {
    ADD_PRODUCT_TO_SHOPPING_CART,
    CLEAR_SHOPPING_CART,
    REMOVE_PRODUCT_FROM_SHOPPING_CART,
    SET_SHOPPING_CART_ITEM_QUANTITY,
} from './shoppingCartActions';

const initialState = {
    products: [],
    total: 0,
};

export const computeShoppingCartTotal = products => products.reduce((total, p) => total + (p.price * p.quantity), 0);

export default (state = initialState, { type, payload }) => {
    const products = state.products;

    switch (type) {
    case ADD_PRODUCT_TO_SHOPPING_CART:
        let productToAdd = products.find(p => p.id === payload.id);

        if (!productToAdd) {
            productToAdd = {
                ...payload,
                quantity: 0,
            };

            products.push(productToAdd);
        }

        productToAdd.quantity += payload.quantity;
        return { ...state, products, total: computeShoppingCartTotal(products) };

    case CLEAR_SHOPPING_CART:
        return initialState;

    case REMOVE_PRODUCT_FROM_SHOPPING_CART:
        const newproducts = products.filter(p => p.id !== payload);
        return { ...state, products: newproducts, total: computeShoppingCartTotal(newproducts) };

    case SET_SHOPPING_CART_ITEM_QUANTITY:
        const productToChange = products.find(p => p.id === payload.id);

        if (productToChange) {
            productToChange.quantity = payload.quantity;
        }

        return { ...state, products, total: computeShoppingCartTotal(products) };

    default:
        return state;
    }
};
