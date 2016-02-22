import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import HelmetTitle from '../app/HelmetTitle';
import orderActions from './orderActions';
import NewOrderItem from './NewOrderItem';
import { removeProductFromShoppingCart as removeProductFromShoppingCartAction, setShoppingCartItemQuantity as setShoppingCartItemQuantityAction } from '../shoppingcart/shoppingCartActions';
import { ProductPropType } from '../product/productPropTypes';

class NewOrder extends Component {
    render() {
        const { loading, order, products, removeProductFromShoppingCart, setShoppingCartItemQuantity, total } = this.props;

        return (
            <div className="shopping-cart list-group">
                <h2>New order</h2>
                <HelmetTitle title="Shopping cart" />
                {products.length === 0 &&
                    <div className="list-group-item">Your shopping cart is empty</div>
                }
                {products.map(product => (
                    <NewOrderItem
                        key={product.id}
                        {...product}
                        removeProductFromShoppingCart={removeProductFromShoppingCart}
                        setShoppingCartItemQuantity={setShoppingCartItemQuantity}
                    />
                ))}
                {products.length > 0 &&
                    <div className="list-group-item text-xs-right lead">
                        TOTAL: {numeral(total).format('$0.00')}
                    </div>
                }
                    <div className="list-group-item">
                        {products.length > 0 &&
                            <button onClick={order} disabled={loading} className="btn btn-primary">Order</button>
                        }
                        <Link to="/products" className="btn btn-link">Continue shopping</Link>
                    </div>
            </div>
        );
    }
}

NewOrder.propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
        ...ProductPropType,
        quantity: PropTypes.number.isRequired,
    })),
    removeProductFromShoppingCart: PropTypes.func.isRequired,
    setShoppingCartItemQuantity: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        ...state.shoppingCart,
        loading: state.order.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        order: orderActions.order.request,
        removeProductFromShoppingCart: removeProductFromShoppingCartAction,
        setShoppingCartItemQuantity: setShoppingCartItemQuantityAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
