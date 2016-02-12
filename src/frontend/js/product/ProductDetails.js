import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ProductItem from './ProductItem';

const ProductDetails = ({ product}) => (
    <div className="list-group">
        <Helmet title={`New App - ${product.name}`} />
        <ProductItem key={product.id} {...product} />
    </div>
);

ProductDetails.propTypes = {
    product: PropTypes.shape(ProductItem.propTypes),
};

function mapStateToProps(state, ownProps) {
    return {
        product: state.product.products.find(p => p.id === ownProps.params.id),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
