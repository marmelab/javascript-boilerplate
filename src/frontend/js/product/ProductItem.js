import React, { PropTypes } from 'react';
import numeral from 'numeral';
import { Link } from 'react-router';

const ProductItem = ({ id, name, description, price, imageUrl }) => (
    <div className="card">
        <img src={imageUrl} className="card-img-top img-fluid" />
        <div className="card-block">
            <h4 className="card-title">{name}</h4>
            <h6 className="card-subtitle text-muted">{numeral(price).format('$0.00')}</h6>
        </div>
        <div className="card-block">
            <p className="card-text">{description}</p>
            <Link to={`/products/${id}`} className="card-link">Details</Link>
            <Link to={`/order/${id}`} className="card-link">Order</Link>
        </div>
    </div>
);

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default ProductItem;
