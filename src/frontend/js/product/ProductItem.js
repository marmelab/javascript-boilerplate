import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';
import { Link } from 'react-router';

import ProductPropType from './productPropTypes';

class ProductItem extends Component {
    orderProduct = () => {
        this.props.orderProduct(this.props.product);
    }

    render() {
        const { product: { id, reference, description, price, thumbnail }, orderProduct } = this.props;

        return (
            <div className="card product-item">
                <Link to={`/products/${id}`} className="card-link">
                    <img src={thumbnail} alt={reference} className="card-img-top img-fluid" />
                </Link>
                <div className="card-block">
                    <h4 className="card-title">{reference}</h4>
                    <h6 className="card-subtitle text-muted">{numeral(price).format('$0.00')}</h6>
                </div>
                <div className="card-block">
                    <p className="card-text">{description}</p>
                    <Link to={`/products/${id}`} className="card-link">Details</Link>
                    <a
                        onClick={orderProduct}
                        className="card-link btn btn-primary"
                    >
                        Buy
                    </a>
                </div>
            </div>
        );
    }
}

ProductItem.propTypes = {
    product: PropTypes.shape(ProductPropType),
    orderProduct: PropTypes.func.isRequired,
};

export default ProductItem;
