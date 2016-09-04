/* eslint react/prop-types: 0 */
import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import numeral from 'numeral';
import Icon from 'react-fa';
import { Link } from 'react-router';
import ProductPropType from '../product/productPropTypes';

const NewOrderItem = ({
    id,
    reference,
    price,
    quantity,
    removeProductFromShoppingCart,
    setShoppingCartItemQuantity,
}) => (
    <div className="list-group-item">
        <div className="row">
            <div className="col-xs-8">
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
            <div className="col-xs-2">
                <input
                    onChange={setShoppingCartItemQuantity}
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

NewOrderItem.propTypes = {
    ...ProductPropType,
    quantity: PropTypes.number.isRequired,
    removeProductFromShoppingCart: PropTypes.func.isRequired,
    setShoppingCartItemQuantity: PropTypes.func.isRequired,
};

export default compose(
    withHandlers({
        setShoppingCartItemQuantity: props => event => {
            props.setShoppingCartItemQuantity(props.id, parseInt(event.target.value, 10));
        },
        removeProductFromShoppingCart: props => () => props.removeProductFromShoppingCart(props.id),
    })
)(NewOrderItem);
