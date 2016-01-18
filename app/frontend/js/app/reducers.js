import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import user from 'common/user/userReducer';

const rootReducer = combineReducers({
    router,
    user,
});

export default rootReducer;
