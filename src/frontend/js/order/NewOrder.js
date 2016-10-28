import React, { Component, PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import orderActions from './actions';
import NewOrderItem from './NewOrderItem';
import {
    removeProductFromShoppingCart as removeProductFromShoppingCartAction,
    setShoppingCartItemQuantity as setShoppingCartItemQuantityAction,
} from '../shoppingcart/actions';
import ProductPropType from '../product/productPropTypes';
import withWindowTitle from '../app/withWindowTitle';

const mapStateToProps = state => ({
    ...state.shoppingCart,
    loading: state.order.loading,
});

const mapDispatchToProps = ({
    placeNewOrder: orderActions.order.request,
    removeProductFromShoppingCart: removeProductFromShoppingCartAction,
    setShoppingCartItemQuantity: setShoppingCartItemQuantityAction,
});

class NewOrder extends Component {
    placeNewOrder = () => {
        this.props.placeNewOrder(this.props.products);
    }

    render() {
        const {
            loading,
            products,
            removeProductFromShoppingCart,
            setShoppingCartItemQuantity,
            total,
        } = this.props;

        return (
            <div className="shopping-cart list-group">
                <h2>New order</h2>
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
                    {products.length > 0 && // bind is not cool but this will be fixed using recompose
                        <button
                            onClick={this.placeNewOrder}
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            Order
                        </button>
                    }
                    <Link to="/products" className="btn btn-link">Continue shopping</Link>
                </div>
            </div>
        );
    }
}

NewOrder.propTypes = {
    loading: PropTypes.bool.isRequired,
    placeNewOrder: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
        ...ProductPropType,
        quantity: PropTypes.number.isRequired, // eslint-disable-line
    })),
    removeProductFromShoppingCart: PropTypes.func.isRequired,
    setShoppingCartItemQuantity: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
};

export default compose(
    withWindowTitle('New order'),
    connect(mapStateToProps, mapDispatchToProps),
)(NewOrder);
