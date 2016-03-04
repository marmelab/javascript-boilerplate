import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import order from '../order/orderReducer';
import product from '../product/productReducer';
import shoppingCart from '../shoppingcart/shoppingCartReducer';
import userReducerFactory from '../user/userReducer';

const rootReducer = combineReducers({
    form,
    routing: routerReducer,
    user: userReducerFactory(window.localStorage),
    order,
    product,
    shoppingCart,
});

export default rootReducer;
