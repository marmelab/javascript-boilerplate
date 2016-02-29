import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';
import { Link } from 'react-router';
import { ProductPropType } from '../product/productPropTypes';

class OrderProductItem extends Component {
    render() {
        const {id, reference, price, quantity } = this.props;

        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="col-xs-8">
                        <h4 className="list-group-item-heading">
                            <Link to={`/products/${id}`}>{reference}</Link>
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
    }
}

OrderProductItem.propTypes = {
    ...ProductPropType,
    quantity: PropTypes.number.isRequired,
};

export default OrderProductItem;
