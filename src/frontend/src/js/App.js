/* globals APP_NAME */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { RouteTransition } from 'react-router-transition';
import HelmetTitle from './app/HelmetTitle';
import { signOut as signOutActions } from './user/actions';
import AppNavbar from './app/AppNavbar';
import ShoppingCart from './shoppingcart/ShoppingCart';
import { isAuthenticated } from './user/reducer';

export class AppComponent extends Component {
    static mapStylesForRouteTransition(s) {
        return { transform: `translateX(${s.translateX}%)` };
    }

    componentWillReceiveProps(nextProps) {
        const { user, signOut } = nextProps;
        const currentTime = (new Date()).getTime();

        if (user.token && user.expires && user.expires < currentTime) {
            signOut();
        }
    }

    handleSignOut = () => {
        this.props.signOut();
    }

    render() {
        const { authenticated, children, location, user } = this.props;

        return (
            <div className="app container-fluid">
                <HelmetTitle />
                <AppNavbar {...{ authenticated, user, signOut: this.handleSignOut }} />
                <div className="row">
                    <div className="col-xs-12 col-md-10 col-lg-9">
                        <RouteTransition
                            pathname={location.pathname}
                            atEnter={{ translateX: 100 }}
                            atLeave={{ translateX: -100 }}
                            atActive={{ translateX: 0 }}
                            mapStyles={AppComponent.mapStylesForRouteTransition}
                            style={{ position: 'relative' }}
                        >
                            <div style={{ position: 'absolute', width: '100%' }}>
                                {children}
                            </div>
                        </RouteTransition>
                    </div>
                    <div className="col-xs-12 col-md-2 col-lg-3">
                        <ShoppingCart />
                    </div>
                </div>
            </div>
        );
    }
}

AppComponent.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    children: PropTypes.node,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user, authenticated: isAuthenticated(state) });

const mapDispatchToProps = ({ signOut: signOutActions.request });

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
