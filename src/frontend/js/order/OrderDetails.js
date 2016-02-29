import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import HelmetTitle from '../app/HelmetTitle';
import Loading from '../app/Loading';
import orderActions from './orderActions';
import OrderItem from './OrderItem';
import OrderProductItem from './OrderProductItem';
import OrderStatusBadge from './OrderStatusBadge';

class OrderDetails extends Component {
    componentDidMount() {
        this.props.loadOrder(this.props.orderId);
    }

    render() {
        const { loading, order } = this.props;

        if (loading || !order) {
            return (
                <div className="col-xs-12">
                    <Loading />
                </div>
            );
        }

        const { reference, date, total, status, products } = order;
        const formattedDate = moment(date).format('L');

        return (
            <div className="shopping-cart list-group">
                <HelmetTitle title={`Order ${reference} - ${formattedDate}`} />
                <h2>
                    <OrderStatusBadge status={status} />
                    #{reference} - {formattedDate}
                </h2>
                <div className="list-group">
                    {products.map(product => (
                        <OrderProductItem
                            key={product.product_id}
                            id={product.product_id}
                            {...product}
                        />
                    ))}
                    <div className="list-group-item text-xs-right lead">
                        TOTAL: {numeral(total).format('$0.00')}
                    </div>
                </div>
            </div>
        );
    }
}

OrderDetails.propTypes = {
    orderId: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    order: PropTypes.shape(OrderItem.propTypes),
    loadOrder: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    const orderId = parseInt(ownProps.params.id, 10);
    const orderFromState = state.order.item;

    return {
        loading: state.order.loading,
        orderId,
        order: orderFromState,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadOrder: orderActions.item.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
