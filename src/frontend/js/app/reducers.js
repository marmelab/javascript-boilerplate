import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { createEntityReducer } from './entities/reducers';

import { orderActionTypes } from '../order/actions';
import { productActionTypes } from '../product/actions';

import shoppingCart from '../shoppingcart/reducer';
import userReducerFactory from '../user/reducer';

const rootReducer = combineReducers({
    form,
    routing: routerReducer,
    user: userReducerFactory(window.localStorage),
    order: createEntityReducer(orderActionTypes),
    product: createEntityReducer(productActionTypes),
    shoppingCart,
});

export default rootReducer;
