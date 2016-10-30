import React, { Component, PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import HelmetTitle from '../app/HelmetTitle';
import ProductPropType from './propTypes';
import { addProductToShoppingCart } from '../shoppingcart/actions';
import withWindowTitle from '../app/withWindowTitle';

class ProductDetails extends Component {
    orderProduct = () => {
        this.props.orderProduct(this.props.product);
    }

    render() {
        const { loading } = this.props;

        if (loading) return <i className="fa fa-spinner fa-spin" />;

        const { product: { reference, description, price, thumbnail } } = this.props;

        return (
            <div className="row product-details">
                <HelmetTitle title={name} />
                <div className="col-xs-12 col-md-4 col-lg-3">
                    <img src={thumbnail} alt={name} className="img-thumbnail" />
                </div>
                <div className="col-xs-12 col-md-8 col-lg-9">
                    <h2>{reference}</h2>
                    <p className="description">{description}</p>
                    <p className="price">Price: {numeral(price).format('$0.00')}</p>
                    <p>
                        <button
                            onClick={this.orderProduct}
                            className="btn btn-lg btn-primary"
                        >
                            Buy
                        </button>
                        <Link to="/products" className="btn btn-lg btn-link">Return to product list</Link>
                    </p>
                </div>
            </div>
        );
    }
}

ProductDetails.propTypes = {
    loading: PropTypes.bool.isRequired,
    product: ProductPropType,
    orderProduct: PropTypes.func.isRequired,
};


const productQuery = gql`
    query product($id: ID!) {
        product(id: $id) {
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

const titleSelector = (state, { product }) => {
    if (product) return product.name;
    return null;
};

export default compose(
    graphql(productQuery, {
        options: ({ params: { id } }) => ({ variables: { id } }),
        props: ({ data: { loading, product } }) => ({ loading, product }),
    }),
    withWindowTitle(titleSelector),
    connect(undefined, mapDispatchToProps),
)(ProductDetails);
