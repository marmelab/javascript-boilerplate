import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

export default [{
    path: '/products',
    component: ProductList,
}, {
    path: '/products/:id',
    component: ProductDetails,
}];
