import { isAuthenticated } from './reducer';

export default store =>
    (nextState, replace) => {
        if (!isAuthenticated(store.getState())) {
            replace({
                pathname: '/sign-in',
                state: { nextPathname: nextState.location.pathname },
            });
        }
    };
