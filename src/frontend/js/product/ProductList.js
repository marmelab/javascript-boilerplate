import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ProductItem from './ProductItem';
import { addProductToShoppingCart } from '../shoppingcart/actions';
import ProductPropType from './propTypes';
import withWindowTitle from '../app/withWindowTitle';

const ProductList = ({ loading, orderProduct, products }) => (
    <div className="row product-list">
        {loading && <i className="fa fa-spinner fa-spin" />}
        {!loading && products.map(product => (
            <div key={product.id} className="col-xs-12 col-md-6 col-lg-3">
                <ProductItem {... { product, orderProduct }} />
            </div>
        ))}
    </div>
);

ProductList.propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.arrayOf(ProductPropType),
    orderProduct: PropTypes.func.isRequired,
};

const productListQuery = gql`
    query products {
        products {
            description
            id
            price
            reference
            thumbnail
        }
    }
`;

const mapDispatchToProps = ({
    orderProduct: addProductToShoppingCart,
});

export default compose(
    withWindowTitle('Products'),
    graphql(productListQuery, {
        props: ({ data: { loading, products } }) => ({ loading, products }),
    }),
    connect(undefined, mapDispatchToProps)
)(ProductList);
