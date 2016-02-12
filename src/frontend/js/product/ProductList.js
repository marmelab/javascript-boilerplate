import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HelmetTitle from '../app/HelmetTitle';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => (
    <div className="row product-list">
        <HelmetTitle title="Products" />
        {products.map(product => (
            <div key={product.id} className="product-item col-xs-12 col-md-6 col-lg-3">
                <ProductItem {...product} />
            </div>
        ))}
    </div>
);

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(ProductItem.propTypes)),
};

function mapStateToProps(state) {
    return {
        products: state.product.products,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
