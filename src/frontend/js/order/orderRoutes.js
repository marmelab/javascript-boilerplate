import NewOrder from './NewOrder';
import OrderList from './OrderList';
import OrderDetails from './OrderDetails';
import redirectIfNotAuthenticatedFactory from '../user/redirectIfNotAuthenticated';

export default store => {
    const redirectIfNotAuthenticated = redirectIfNotAuthenticatedFactory(store);

    return [{
        path: '/orders',
        onEnter: redirectIfNotAuthenticated,
        component: OrderList,
    }, {
        path: '/orders/new',
        onEnter: redirectIfNotAuthenticated,
        component: NewOrder,
    }, {
        path: '/orders/:id',
        onEnter: redirectIfNotAuthenticated,
        component: OrderDetails,
    }];
};
