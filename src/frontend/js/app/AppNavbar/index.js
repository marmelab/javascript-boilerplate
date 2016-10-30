import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import UserNavbarItem from './UserNavbarItem';

const NavbarItem = ({ children, to }) => (
    <li className="nav-item">
        <Link className="nav-link" to={to}>{children}</Link>
    </li>
);

NavbarItem.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

const AppNavbar = ({ authenticated, signOut, user }) => (
    <nav className="navbar navbar-fixed-top navbar-dark bg-primary">
        <Link className="navbar-brand" to="/products">New App</Link>
        <ul className="nav navbar-nav">
            <NavbarItem to="/products">Products</NavbarItem>
            <NavbarItem to="/orders">Orders</NavbarItem>
        </ul>
        {user && authenticated && <UserNavbarItem {...{ user, signOut }} />}
    </nav>
);

AppNavbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired, // eslint-disable-line
};

export default AppNavbar;
