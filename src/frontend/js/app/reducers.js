import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import userReducerFactory from '../user/userReducer';
import product from '../product/productReducer';
import order from '../order/orderReducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
    form,
    routing: routeReducer,
    user: userReducerFactory(window.localStorage),
    order,
    product,
});

export default rootReducer;
