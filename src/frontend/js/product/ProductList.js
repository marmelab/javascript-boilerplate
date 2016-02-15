import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HelmetTitle from '../app/HelmetTitle';
import Loading from '../app/Loading';
import ProductItem from './ProductItem';
import { loadProducts as loadProductsAction } from './productActions';

class ProductList extends Component {
    componentDidMount() {
        this.props.loadProducts();
    }

    render() {
        const { loading, products } = this.props;

        return (
            <div className="row product-list">
                <HelmetTitle title="Products" />
                {loading &&
                    <div className="col-xs-12">
                        <Loading />
                    </div>
                }
                {!loading &&
                    products.map(product => (
                        <div key={product.id} className="col-xs-12 col-md-6 col-lg-3">
                            <ProductItem {...product} />
                        </div>
                    ))
                }
            </div>
        );
    }
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(ProductItem.propTypes)),
    loading: PropTypes.bool.isRequired,
    loadProducts: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        loading: state.product.loading,
        products: state.product.products,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadProducts: loadProductsAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
