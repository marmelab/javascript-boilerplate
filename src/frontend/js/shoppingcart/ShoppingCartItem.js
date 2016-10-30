/* eslint react/prop-types: 0 */
import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';
import Icon from 'react-fa';
import { Link } from 'react-router';

import ShoppingCartItemPropType from './propTypes';

class ShoppingCartItem extends Component {
    removeProductFromShoppingCart = () => {
        this.props.removeProductFromShoppingCart(this.props.id);
    }

    render() {
        const { product: { id, reference, price, quantity } } = this.props;

        return (
            <div className="list-group-item">
                <span className="tag tag-default float-xs-right">
                    {numeral(price * quantity).format('$0.00')}
                </span>
                {quantity > 1 &&
                    <span className="tag tag-default float-xs-right">
                        {quantity} x {numeral(price).format('$0.00')}
                    </span>
                }
                <h4 className="list-group-item-heading">
                    <button
                        onClick={this.removeProductFromShoppingCart}
                        className="btn text-danger btn-link"
                    >
                        <Icon name="remove" />
                    </button>
                    <Link to={`/products/${id}`}>{reference}</Link>
                </h4>
            </div>
        );
    }
}

ShoppingCartItem.propTypes = {
    product: ShoppingCartItemPropType.isRequired,
    removeProductFromShoppingCart: PropTypes.func.isRequired,
};

export default ShoppingCartItem;
