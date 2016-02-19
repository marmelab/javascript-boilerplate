import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router';
import HelmetTitle from '../app/HelmetTitle';
import Loading from '../app/Loading';
import ProductItem from './ProductItem';
import productActions from './productActions';
import { ProductPropType } from './productPropTypes';

class ProductDetails extends Component {
    componentDidMount() {
        if (!this.props.product) {
            this.props.loadProduct(this.props.productId);
        }
    }

    render() {
        const { loading, orderProduct, product } = this.props;

        if (loading || !product) {
            return (
                <div className="col-xs-12">
                    <Loading />
                </div>
            );
        }

        const { id, reference, description, price, image } = product;

        return (
            <div className="row product-details">
                <HelmetTitle title={name} />
                <div className="col-xs-12 col-md-4 col-lg-3">
                    <img src={image} className="img-thumbnail" />
                </div>
                <div className="col-xs-12 col-md-8 col-lg-9">
                    <h2>{reference}</h2>
                    <p className="description">{description}</p>
                    <p className="price">Price: {numeral(price).format('$0.00')}</p>
                    <p>
                        <button onClick={orderProduct} className="btn btn-primary">Buy</button>
                        <Link to="/products" className="btn btn-link">Return to product list</Link>
                    </p>
                </div>
            </div>
        );
    }
}

ProductDetails.propTypes = {
    productId: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    product: PropTypes.shape(ProductPropType),
    loadProduct: PropTypes.func.isRequired,
    orderProduct: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    const productId = parseInt(ownProps.params.id, 10);
    const productFromState = state.product.item;
    const productFromList = state.product.list.length > 0 ? state.product.list.find(p => p.id === productId) : null;

    return {
        loading: state.product.loading,
        productId,
        product: productFromState || productFromList,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadProduct: productActions.item.request,
        orderProduct: productActions.order.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
