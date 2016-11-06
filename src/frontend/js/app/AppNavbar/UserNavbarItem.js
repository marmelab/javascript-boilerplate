import React, { Component, PropTypes } from 'react';

class UserNavbarItem extends Component {
    signOut = () => {
        this.props.signOut();
    }

    render() {
        const { user } = this.props;

        return (
            <ul className="nav navbar-nav float-xs-right">
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
                        <button className="dropdown-item" onClick={this.signOut} role="button">Sign out</button>
                    </div>
                </li>
            </ul>
        );
    }
}

UserNavbarItem.propTypes = {
    signOut: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default UserNavbarItem;
