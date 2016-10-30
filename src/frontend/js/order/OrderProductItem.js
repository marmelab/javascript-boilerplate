import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router';
import OrderItemPropType from './propTypes';

const OrderProductItem = ({ item: { id, reference, price, product_id, quantity } }) => (
    <div className="list-group-item">
        <div className="row">
            <div className="col-xs-8">
                <h4 className="list-group-item-heading">
                    <Link to={`/products/${product_id}`}>{reference}</Link>
                </h4>
            </div>
            <div className="col-xs-2 text-xs-right">
                {quantity} x {numeral(price).format('$0.00')}
            </div>
            <div className="col-xs-2 text-xs-right">
                {numeral(price * quantity).format('$0.00')}
            </div>
        </div>
    </div>
);

OrderProductItem.propTypes = {
    item: OrderItemPropType.item.isRequired,
};

export default OrderProductItem;
