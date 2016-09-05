import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HelmetTitle from '../app/HelmetTitle';
import Loading from '../app/Loading';
import ProductItem from './ProductItem';
import productActions from './actions';
import { addProductToShoppingCart } from '../shoppingcart/actions';
import ProductPropType from './productPropTypes';

const ProductList = ({ orderProduct, products }) => (
    <div className="col-xs-12">
        <div className="row">
            {products.map(product => (
                <div key={product.id} className="col-xs-12 col-md-6 col-lg-3">
                    <ProductItem {... { ...product, orderProduct }} />
                </div>
            ))}
        </div>
    </div>
);

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(ProductPropType)),
    orderProduct: PropTypes.func.isRequired,
};

class ProductListContainer extends Component {
    componentDidMount() {
        this.props.loadProducts();
    }

    render() {
        const { loading, orderProduct, products } = this.props;

        return (
            <div className="row product-list">
                <HelmetTitle title="Products" />
                {loading &&
                    <div className="col-xs-12">
                        <Loading />
                    </div>
                }
                {!loading && <ProductList {... { orderProduct, products }} /> }
            </div>
        );
    }
}

ProductListContainer.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(ProductPropType)),
    loading: PropTypes.bool.isRequired,
    loadProducts: PropTypes.func.isRequired,
    orderProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.product.loading,
    products: state.product.list,
});

const mapDispatchToProps = ({
    loadProducts: productActions.list.request,
    orderProduct: addProductToShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
