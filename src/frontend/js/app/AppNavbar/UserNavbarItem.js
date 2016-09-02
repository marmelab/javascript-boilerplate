import React, { PropTypes } from 'react';

const UserNavbarItem = ({ user, signOut }) => (
    <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item dropdown">
            <a
                aria-expanded="false"
                aria-haspopup="true"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                role="button"
            >
                {user.email}
            </a>
            <div className="dropdown-menu">
                <a
                    className="dropdown-item"
                    onClick={signOut}
                    role="button"
                >
                    Sign out
                </a>
            </div>
        </li>
    </ul>
);

UserNavbarItem.propTypes = {
    signOut: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default UserNavbarItem;
