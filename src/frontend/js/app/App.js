import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import HelmetTitle from './HelmetTitle';
import { signOut as signOutActions } from '../user/userActions';
import ShoppingCart from '../shoppingcart/ShoppingCart';

export class App extends Component {
    componentWillReceiveProps(nextProps) {
        const { user, signOut } = nextProps;
        const currentTime = (new Date()).getTime();

        if (user.token && user.expires && user.expires < currentTime) {
            signOut();
        }
    }

    render() {
        const { user, signOut } = this.props;

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
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                        {user.email}
                                    </a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" onClick={() => signOut()}>Sign out</a>
                                    </div>
                                </li>
                            </ul>
                        }
                    </nav>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-10 col-lg-9">
                    {this.props.children}
                    </div>
                    <div className="col-xs-12 col-md-2 col-lg-3">
                        <ShoppingCart />
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signOut: signOutActions.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
