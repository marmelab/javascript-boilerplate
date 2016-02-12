import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

module.exports = [{
    path: '/products',
    component: ProductList,
}, {
    path: '/products/:id',
    component: ProductDetails,
}];
