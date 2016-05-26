import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ShoppingCartItem from './ShoppingCartItem';
import {
    removeProductFromShoppingCart as removeProductFromShoppingCartAction,
} from './shoppingCartActions';
import ProductPropType from '../product/productPropTypes';
import numeral from 'numeral';

class ShoppingCart extends Component {
    render() {
        const { removeProductFromShoppingCart, products, total } = this.props;

        return (
            <div className="shopping-cart list-group">
                {products.length === 0 &&
                    <div className="list-group-item">Your shopping cart is empty...</div>
                }
                {products.map(product => (
                    <ShoppingCartItem
                        key={product.id}
                        {...product}
                        removeProductFromShoppingCart={removeProductFromShoppingCart}
                    />
                ))}
                {products.length > 0 &&
                    <div className="list-group-item text-xs-right lead">
                        TOTAL: {numeral(total).format('$0.00')}
                    </div>
                }
                {products.length > 0 &&
                    <div className="list-group-item">
                        <Link to="/orders/new" className="btn btn-primary btn-block">Order</Link>
                    </div>
                }
            </div>
        );
    }
}

ShoppingCart.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        ...ProductPropType,
        quantity: PropTypes.number.isRequired,
    })),
    removeProductFromShoppingCart: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return state.shoppingCart;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeProductFromShoppingCart: removeProductFromShoppingCartAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
