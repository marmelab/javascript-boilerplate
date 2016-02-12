import App from './App';
import productRoutes from '../product/productRoutes';

export default {
    component: 'div',
    childRoutes: [{
        path: '/',
        component: App,
        childRoutes: [
            ...productRoutes,
        ],
    }],
};
