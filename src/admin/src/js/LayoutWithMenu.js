/* globals APP_NAME */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import ActionExit from 'material-ui/svg-icons/action/exit-to-app';

import Notification from 'admin-on-rest/lib/mui/layout/Notification';
import Menu from './Menu';
import { signOut as signOutAction } from './user/actions';

const LayoutWithMenu = ({ isLoading, children, user: { email }, signOut }) => {
    const Title = (
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            {`${APP_NAME} - Administration`} - {email}
        </Link>
    );
    const LoadingIcon = isLoading ? <CircularProgress color="#fff" size={0.2} /> : <ActionExit />;
    const RightElement = <FlatButton label="Sign out" onClick={signOut} icon={LoadingIcon} />;

    return (
        <MuiThemeProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar title={Title} iconElementRight={RightElement} />
                <div className="body" style={{ display: 'flex', flex: '1', backgroundColor: '#edecec' }}>
                    <div style={{ flex: 1 }}>{children}</div>
                    <Menu />
                </div>
                <Notification />
            </div>
        </MuiThemeProvider>
    );
};

LayoutWithMenu.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node,
    route: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isLoading: state.admin.loading > 0,
    user: state.user,
});

const mapDispatchToProps = ({ signOut: signOutAction.request });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutWithMenu);
