import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import shoppingCart from './shoppingcart/reducer';
import userReducerFactory from './user/reducer';
import product from './product/reducer';
import order from './order/reducer';

const rootReducer = combineReducers({
    form,
    routing: routerReducer,
    user: userReducerFactory(window.localStorage),
    order,
    product,
    shoppingCart,
});

export default rootReducer;
