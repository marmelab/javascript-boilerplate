import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux'
import userReducerFactory from '../user/userReducer';
import product from '../product/productReducer';

const rootReducer = combineReducers({
    routing: routeReducer,
    user: userReducerFactory(window.sessionStorage),
    product,
});

export default rootReducer;
