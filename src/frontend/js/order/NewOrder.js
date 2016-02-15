import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router';
import HelmetTitle from '../app/HelmetTitle';
import OrderItem from './OrderItem';

const OrderDetails = ({ product: { id, name, description, price, imageUrl }}) => (
    <div className="row product-details">
        <HelmetTitle title={name} />
        <div className="col-xs-12 col-md-4 col-lg-3">
            <img src={imageUrl} className="img-thumbnail" />
        </div>
        <div className="col-xs-12 col-md-8 col-lg-9">
            <h2>{name}</h2>
            <p className="description">{description}</p>
            <p className="price">Price: {numeral(price).format('$0.00')}</p>
            <p>
                <Link to={`/order/${id}`} className="btn btn-primary">Buy</Link>
                <Link to="/products" className="btn btn-link">Return to product list</Link>
            </p>
        </div>
    </div>
);

OrderDetails.propTypes = {
    product: PropTypes.shape(OrderItem.propTypes),
};

function mapStateToProps(state, ownProps) {
    return {
        product: state.product.products.find(p => p.id === ownProps.params.id),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
