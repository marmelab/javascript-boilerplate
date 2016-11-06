import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import ShoppingCartItem from './ShoppingCartItem';
import { removeProductFromShoppingCart as removeProductFromShoppingCartAction } from './actions';
import ShoppingCartItemPropType from './propTypes';

export const EmptyShoppingCart = () => (
    <div className="list-group-item">Your shopping cart is empty...</div>
);

export const ShoppingCartTotal = ({ total }) => (
    <div className="list-group-item text-xs-right lead">
        TOTAL: {numeral(total).format('$0.00')}
    </div>
);

ShoppingCartTotal.propTypes = {
    total: PropTypes.number.isRequired,
};

export const ShoppingCartOrderButton = () => (
    <div className="list-group-item">
        <Link to="/orders/new" className="btn btn-primary btn-block">Order</Link>
    </div>
);

const ShoppingCart = ({ removeProductFromShoppingCart, products, total }) => (
    <div className="shopping-cart list-group">
        {products.length === 0 && <EmptyShoppingCart />}

        {products.map(product => (
            <ShoppingCartItem
                key={product.id}
                product={product}
                removeProductFromShoppingCart={removeProductFromShoppingCart}
            />
        ))}
        {products.length > 0 && <ShoppingCartTotal {...{ total }} />}

        {products.length > 0 && <ShoppingCartOrderButton />}
    </div>
);

ShoppingCart.propTypes = {
    products: PropTypes.arrayOf(ShoppingCartItemPropType),
    removeProductFromShoppingCart: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
};

const mapStateToProps = state => state.shoppingCart;

const mapDispatchToProps = ({ removeProductFromShoppingCart: removeProductFromShoppingCartAction });

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
