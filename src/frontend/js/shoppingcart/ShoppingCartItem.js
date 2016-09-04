/* eslint react/prop-types: 0 */
import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import numeral from 'numeral';
import Icon from 'react-fa';
import { Link } from 'react-router';
import ProductPropType from '../product/productPropTypes';

const ShoppingCartItem = ({ id, reference, price, quantity, removeProductFromShoppingCart }) => (
    <div className="list-group-item">
        <span className="label label-default pull-xs-right">
            {numeral(price * quantity).format('$0.00')}
        </span>
        {quantity > 1 &&
            <span className="label label-default pull-xs-right">
                {quantity} x {numeral(price).format('$0.00')}
            </span>
        }
        <h4 className="list-group-item-heading">
            <button
                onClick={removeProductFromShoppingCart}
                className="btn text-danger btn-link"
            >
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

export default compose(
    withHandlers({
        removeProductFromShoppingCart: props => () => props.removeProductFromShoppingCart(props.id),
    })
)(ShoppingCartItem);
