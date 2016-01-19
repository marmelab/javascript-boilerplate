import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import userReducerFactory from 'common/user/userReducer';

const rootReducer = combineReducers({
    router,
    user: userReducerFactory(window.sessionStorage),
});

export default rootReducer;
