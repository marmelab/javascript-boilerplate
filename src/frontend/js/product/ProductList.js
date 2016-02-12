import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => (
    <div className="list-group">
        <Helmet title="New App - Products" />
        {products.map(product => <ProductItem key={product.id} {...product} />)}
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
