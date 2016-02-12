import App from './App';
import productRoutes from '../product/productRoutes';
import orderRoutesFactory from '../order/orderRoutes';
import userRoutesFactory from '../user/userRoutes';

export default store => {
    return {
        component: 'div',
        childRoutes: [{
            path: '/',
            component: App,
            childRoutes: [
                ...productRoutes,
                ...orderRoutesFactory(store),
                ...userRoutesFactory(store),
            ],
        }],
    };
};
