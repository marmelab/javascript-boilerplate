import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HelmetTitle from '../app/HelmetTitle';
import OrderItem from './OrderItem';

const OrderList = ({ orders }) => (
    <div className="row orders-list">
        <HelmetTitle title="Orders" />
        <div className="col-xs-12">
            <div className="list-group">
                {orders.map(order => (
                    <OrderItem key={order.id} {...order} />
                ))}
            </div>
        </div>
    </div>
);

OrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape(OrderItem.propTypes)),
};

function mapStateToProps(state) {
    return {
        orders: state.order.orders,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
