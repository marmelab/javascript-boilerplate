import React, { PropTypes } from 'react';
import numeral from 'numeral';
import { Link } from 'react-router';
import { ProductPropType } from './productPropTypes';

const ProductItem = ({ id, reference, description, price, thumbnail, orderProduct }) => (
    <div className="card product-item">
        <img src={thumbnail} className="card-img-top img-fluid" />
        <div className="card-block">
            <h4 className="card-title">{reference}</h4>
            <h6 className="card-subtitle text-muted">{numeral(price).format('$0.00')}</h6>
        </div>
        <div className="card-block">
            <p className="card-text">{description}</p>
            <Link to={`/products/${id}`} className="card-link">Details</Link>
            <a onClick={orderProduct} className="card-link btn btn-link">Order</a>
        </div>
    </div>
);

ProductItem.propTypes = {
    ...ProductPropType,
    orderProduct: PropTypes.func.isRequired,
};

export default ProductItem;
