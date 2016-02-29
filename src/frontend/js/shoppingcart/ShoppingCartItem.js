import React, { PropTypes } from 'react';
import numeral from 'numeral';
import Icon from 'react-fa';
import { Link } from 'react-router';
import { ProductPropType } from '../product/productPropTypes';

const ShoppingCartItem = ({id, reference, price, removeProductFromShoppingCart, quantity }) => (
    <div className="list-group-item">
        <span className="label label-default pull-xs-right">{numeral(price * quantity).format('$0.00')}</span>
        {quantity > 1 &&
            <span className="label label-default pull-xs-right">{quantity} x {numeral(price).format('$0.00')}</span>
        }
        <h4 className="list-group-item-heading">
            <button onClick={removeProductFromShoppingCart.bind(null, id)} className="btn text-danger btn-link">
                <Icon name="remove" />
            </button>
            <Link to={`/products/${id}`}>{reference}</Link>
        </h4>
    </div>
);

ShoppingCartItem.propTypes = {
    ...ProductPropType,
    quantity: PropTypes.number.isRequired,
    removeProductFromShoppingCart: PropTypes.func.isRequired,
};

export default ShoppingCartItem;
