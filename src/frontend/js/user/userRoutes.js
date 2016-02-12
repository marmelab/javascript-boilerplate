import Login from './Login';
import redirectIfAuthenticatedFactory from './redirectIfAuthenticated';

export default store => {
    const redirectIfAuthenticated = redirectIfAuthenticatedFactory(store);

    return [{
        path: '/login',
        onEnter: redirectIfAuthenticated,
        component: Login,
    }];
};
