import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

export class App extends Component {
    render() {
        return (
            <div className="container">
                <Helmet title="New App" />
                <div className="main_screen row">
                    <div className="col-xs-12">
                        <div className="row">
                            <nav className="title-bar">
                                <span className="title">
                                    <strong>New App</strong>
                                    <Link to="products">Products</Link>
                                </span>
                            </nav>
                        </div>
                        <div className="row">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
