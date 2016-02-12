import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import HelmetTitle from './HelmetTitle';
import { logout as logoutAction } from '../user/userActions';

export class App extends Component {
    render() {
        const { user, logout } = this.props;

        return (
            <div className="app container-fluid">
                <HelmetTitle />
                <div className="row">
                    <nav className="navbar navbar-fixed-top navbar-dark bg-primary">
                        <a className="navbar-brand" href="#">New App</a>
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">Orders</Link>
                            </li>
                        </ul>
                        {user && user.authenticated &&
                            <ul className="nav navbar-nav pull-xs-right">
                                <li className="nav-item">
                                    <a href="#" onClick={() => logout()} className="nav-link">Log out</a>
                                </li>
                            </ul>
                        }
                    </nav>
                </div>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: logoutAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
