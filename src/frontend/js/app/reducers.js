import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { createEntityReducer } from './entities/reducers';

import { orderActionTypes } from '../order/orderActions';
import { productActionTypes } from '../product/productActions';

import shoppingCart from '../shoppingcart/shoppingCartReducer';
import userReducerFactory from '../user/userReducer';

const rootReducer = combineReducers({
    form,
    routing: routerReducer,
    user: userReducerFactory(window.localStorage),
    order: createEntityReducer(orderActionTypes),
    product: createEntityReducer(productActionTypes),
    shoppingCart,
});

export default rootReducer;
