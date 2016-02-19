import OrderList from './OrderList';
import redirectIfNotAuthenticatedFactory from '../user/redirectIfNotAuthenticated';

export default store => {
    const redirectIfNotAuthenticated = redirectIfNotAuthenticatedFactory(store);

    return [{
        path: '/orders',
        onEnter: redirectIfNotAuthenticated,
        component: OrderList,
    }];
};
