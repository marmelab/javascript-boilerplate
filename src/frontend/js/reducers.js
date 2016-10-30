import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import shoppingCart from './shoppingcart/reducer';
import userReducerFactory from './user/reducer';

export default reducers => combineReducers({
    form,
    routing: routerReducer,
    user: userReducerFactory(window.localStorage),
    shoppingCart,
    ...reducers,
});
