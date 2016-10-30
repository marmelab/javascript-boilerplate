/* eslint react/prop-types: 0 */
import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';
import Icon from 'react-fa';
import { Link } from 'react-router';
import ProductPropType from '../product/productPropTypes';

class NewOrderItem extends Component {
    setShoppingCartItemQuantity = (event) => {
        this.props.setShoppingCartItemQuantity(this.props.id, parseInt(event.target.value, 10));
    }

    removeProductFromShoppingCart = () => {
        this.props.removeProductFromShoppingCart(this.props.id);
    }

    render() {
        const {
            id,
            reference,
            price,
            quantity,
        } = this.props;

        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="col-xs-8">
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
                    <div className="col-xs-2">
                        <input
                            onChange={this.setShoppingCartItemQuantity}
                            className="form-control"
                            type="number"
                            value={quantity}
                        />
                    </div>
                    <div className="col-xs-2 text-xs-right">
                        {numeral(price * quantity).format('$0.00')}
                    </div>
                </div>
            </div>
        );
    }
}

NewOrderItem.propTypes = {
    ...ProductPropType,
    quantity: PropTypes.number.isRequired,
    removeProductFromShoppingCart: PropTypes.func.isRequired,
    setShoppingCartItemQuantity: PropTypes.func.isRequired,
};

export default NewOrderItem;
