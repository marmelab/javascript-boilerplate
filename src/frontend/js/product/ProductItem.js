import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';
import { Link } from 'react-router';
import ProductPropType from './productPropTypes';

class ProductItem extends Component {
    constructor() {
        super();
        this.orderProduct = this.orderProduct.bind(this);
    }

    orderProduct() {
        /* eslint-disable react/prop-types */
        const { id, reference, description, price, thumbnail, orderProduct } = this.props;
        /* eslint-enable react/prop-types */

        orderProduct({ id, reference, description, price, thumbnail });
    }

    render() {
        /* eslint-disable react/prop-types */
        const { id, reference, description, price, thumbnail } = this.props;
        /* eslint-enable react/prop-types */

        return (
            <div className="card product-item">
                <img src={thumbnail} className="card-img-top img-fluid" />
                <div className="card-block">
                    <h4 className="card-title">{reference}</h4>
                    <h6 className="card-subtitle text-muted">{numeral(price).format('$0.00')}</h6>
                </div>
                <div className="card-block">
                    <p className="card-text">{description}</p>
                    <Link to={`/products/${id}`} className="card-link">Details</Link>
                        <a
                            onClick={this.orderProduct}
                            className="card-link btn btn-link"
                        >
                            Buy
                        </a>
                </div>
            </div>
        );
    }
}

ProductItem.propTypes = {
    ...ProductPropType,
    orderProduct: PropTypes.func.isRequired,
};

export default ProductItem;
