import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { routerActions } from 'react-router-redux';

import NewOrderItem from './NewOrderItem';
import {
    clearShoppingCart as clearShoppingCartAction,
    removeProductFromShoppingCart as removeProductFromShoppingCartAction,
    setShoppingCartItemQuantity as setShoppingCartItemQuantityAction,
} from '../shoppingcart/actions';
import withWindowTitle from '../app/withWindowTitle';
import OrderItemPropType from './propTypes';

class NewOrder extends Component {
    constructor() {
        super();
        this.state = { error: false, submitting: false };
    }

    placeNewOrder = () => {
        const { clearShoppingCart, navigateToOrder, placeNewOrder } = this.props;

        this.setState({ submitting: true }, () => {
            placeNewOrder(this.props.items)
                .then(({ data: { postOrder: { id: orderId } } }) => {
                    this.setState({ submitting: false });
                    clearShoppingCart();
                    navigateToOrder(orderId);
                })
                .catch((error) => {
                    console.error({ error });
                    this.setState({ error: true, submitting: false });
                });
        });
    }

    render() {
        const {
            items,
            removeProductFromShoppingCart,
            setShoppingCartItemQuantity,
            total,
        } = this.props;

        const { error, submitting } = this.state;

        return (
            <div className="shopping-cart list-group">
                <h2>New order</h2>
                {items.length === 0 &&
                    <div className="list-group-item">Your shopping cart is empty</div>
                }
                {items.map(item => (
                    <NewOrderItem
                        key={item.id}
                        item={item}
                        removeProductFromShoppingCart={removeProductFromShoppingCart}
                        setShoppingCartItemQuantity={setShoppingCartItemQuantity}
                    />
                ))}
                {items.length > 0 &&
                    <div className="list-group-item text-xs-right lead">
                        TOTAL: {numeral(total).format('$0.00')}
                    </div>
                }
                <div className="list-group-item">
                    {items.length > 0 && // bind is not cool but this will be fixed using recompose
                        <button
                            onClick={this.placeNewOrder}
                            disabled={submitting}
                            className="btn btn-primary"
                        >
                            {submitting && <i className="fa fa-spinner fa-spin" />}
                            Order
                        </button>
                    }
                    <Link to="/products" className="btn btn-link">Continue shopping</Link>
                    {error && <p className="text-danger">An error occured while posting your order.</p>}
                </div>
            </div>
        );
    }
}

NewOrder.propTypes = {
    clearShoppingCart: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(OrderItemPropType.item),
    navigateToOrder: PropTypes.func.isRequired,
    placeNewOrder: PropTypes.func.isRequired,
    removeProductFromShoppingCart: PropTypes.func.isRequired,
    setShoppingCartItemQuantity: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
};

const postOrderQuery = gql`
    mutation postOrder($products: [PostOrderItem]!) {
        postOrder(products: $products) {
            id
        }
    }
`;

const mapStateToProps = ({ shoppingCart: { products, total } }) => ({
    items: products,
    total,
});

const mapDispatchToProps = dispatch => ({
    clearShoppingCart: bindActionCreators(clearShoppingCartAction, dispatch),
    removeProductFromShoppingCart: bindActionCreators(removeProductFromShoppingCartAction, dispatch),
    setShoppingCartItemQuantity: bindActionCreators(setShoppingCartItemQuantityAction, dispatch),
    navigateToOrder: orderId => dispatch(routerActions.push(`/orders/${orderId}`)),
});

export default compose(
    withWindowTitle('New order'),
    graphql(postOrderQuery, {
        props: ({ mutate }) => ({
            placeNewOrder: products => mutate({
                variables: {
                    products: products.map(p => ({
                        id: p.id,
                        quantity: p.quantity,
                    })),
                },
            }),
        }),
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(NewOrder);
