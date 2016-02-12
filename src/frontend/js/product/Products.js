import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

export class Product extends Component {
    render() {
        return (
            <div>
                <h1>Products list</h1>
            </div>
        );
    }
}

Product.propTypes = {
    history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
