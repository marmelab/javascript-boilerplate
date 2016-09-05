import App from './App';
import productRoutes from '../product/routes';
import orderRoutesFactory from '../order/routes';
import userRoutes from '../user/routes';

export default store => ({
    childRoutes: [{
        path: '/',
        component: App,
        indexRoute: { onEnter: (nextState, replace) => replace('/products') },
        childRoutes: [
            ...productRoutes,
            ...orderRoutesFactory(store),
            ...userRoutes,
        ],
    }],
});
