import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

export class App extends Component {
    render() {
        return (
            <div className="app container-fluid">
                <Helmet title="New App" />
                <div className="row">
                    <nav className="navbar navbar-fixed-top navbar-light bg-faded">
                        <a className="navbar-brand" href="#">New App</a>
                        <ul className="nav navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node.isRequired,
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
