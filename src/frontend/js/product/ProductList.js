import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import ProductItem from './ProductItem';
import productActions from './actions';
import { addProductToShoppingCart } from '../shoppingcart/actions';
import ProductPropType from './productPropTypes';
import withFetchingOnMount from '../../../common-client/fetch/withFetchingOnMount';
import withWindowTitle from '../app/withWindowTitle';

const ProductList = ({ orderProduct, products }) => (
    <div className="row product-list">
        {products.map(product => (
            <div key={product.id} className="col-xs-12 col-md-6 col-lg-3">
                <ProductItem {... { product, orderProduct }} />
            </div>
        ))}
    </div>
);

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(ProductPropType)),
    orderProduct: PropTypes.func.isRequired,
};

const dataSelector = state => state.product.list;
const loadingSelector = state => state.product.loading;

const mapStateToProps = state => ({
    products: state.product.list,
});

const mapDispatchToProps = ({
    orderProduct: addProductToShoppingCart,
});

export default compose(
    withWindowTitle('Products'),
    withFetchingOnMount(productActions.list.request, { dataSelector, loadingSelector }),
    connect(mapStateToProps, mapDispatchToProps)
)(ProductList);
