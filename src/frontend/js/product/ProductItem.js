import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ProductItem = ({ id, name, description, price }) => (
    <Link to={`/products/${id}`} className="list-group-item">
        <span className="label label-default label-pill pull-xs-right">{price}</span>
        <h4 className="list-group-item-heading">{name}</h4>
        <p className="list-group-item-text">{description}</p>
    </Link>
);

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default ProductItem;
