import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router';
import HelmetTitle from '../app/HelmetTitle';
import Loading from '../app/Loading';
import ProductItem from './ProductItem';
import { loadProduct as loadProductAction } from './productActions';

class ProductDetails extends Component {
    componentDidMount() {
        if (!this.props.product) {
            this.props.loadProduct(this.props.productId);
        }
    }

    render() {
        const { loading, product } = this.props;

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
                        <Link to={`/order/${id}`} className="btn btn-primary">Buy</Link>
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
    product: PropTypes.shape(ProductItem.propTypes),
    loadProduct: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    const productId = parseInt(ownProps.params.id, 10);

    return {
        productId,
        loading: state.product.loading,
        product: state.product.product ? state.product.product : (state.product.products.length > 0 ? state.product.products.find(p => p.id === productId) : null),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadProduct: loadProductAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
