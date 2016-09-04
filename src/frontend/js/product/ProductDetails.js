import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router';
import HelmetTitle from '../app/HelmetTitle';
import productActions from './actions';
import ProductPropType from './productPropTypes';
import { addProductToShoppingCart } from '../shoppingcart/actions';
import { getProductById } from './reducer';
import withFetchingOnMount from '../app/withFetchingOnMount';
import withWindowTitle from '../app/withWindowTitle';

const ProductDetails = ({ product: { reference, description, price, image }, orderProduct }) => (
    <div className="row product-details">
        <HelmetTitle title={name} />
        <div className="col-xs-12 col-md-4 col-lg-3">
            <img src={image} alt={name} className="img-thumbnail" />
        </div>
        <div className="col-xs-12 col-md-8 col-lg-9">
            <h2>{reference}</h2>
            <p className="description">{description}</p>
            <p className="price">Price: {numeral(price).format('$0.00')}</p>
            <p>
                <button
                    onClick={orderProduct}
                    className="btn btn-lg btn-primary"
                >
                    Buy
                </button>
                <Link to="/products" className="btn btn-lg btn-link">Return to product list</Link>
            </p>
        </div>
    </div>
);

ProductDetails.propTypes = {
    product: PropTypes.shape(ProductPropType),
    orderProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const productId = parseInt(ownProps.params.id, 10);
    return {
        product: state.product.item || getProductById(state, productId),
    };
};

const mapDispatchToProps = ({
    loadProduct: productActions.item.request,
    orderProduct: addProductToShoppingCart,
});

const dataStateSelector = (state, ownProps) => {
    const productId = parseInt(ownProps.params.id, 10);
    return state.product.item || getProductById(state, productId);
};
const paramsStateSelector = (state, ownProps) => ownProps.routeParams.id;
const loadingStateSelector = state => state.product.loading;
const titleStateSelector = (state, ownProps) => {
    const productId = parseInt(ownProps.routeParams.id, 10);
    const product = state.product.item || getProductById(state, productId);

    if (product) return product.name;

    return null;
};

export default compose(
    withFetchingOnMount(productActions.item.request, dataStateSelector, paramsStateSelector, loadingStateSelector),
    withWindowTitle(titleStateSelector),
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        orderProduct: props => () => { props.orderProduct(props.product); },
    })
)(ProductDetails);
