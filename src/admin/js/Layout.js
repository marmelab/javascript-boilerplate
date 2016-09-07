/* globals APP_NAME */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import Notification from 'admin-on-rest/src/mui/layout/Notification';
import Menu from 'admin-on-rest/src/mui/layout/Menu';
const Title = <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>{APP_NAME} - Administration</Link>;

const Layout = ({ isLoading, children, route }) => (
    <MuiThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar title={Title} iconElementRight={isLoading ? <CircularProgress color="#fff" size={0.5} /> : <span/> } />
            <div className="body" style={{ display: 'flex', flex: '1', backgroundColor: '#edecec' }}>
                <div style={{ flex: 1 }}>{children}</div>
                <Menu resources={route.resources} />
            </div>
            <Notification />
        </div>
    </MuiThemeProvider>
);

Layout.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node,
    route: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { isLoading: state.admin.loading > 0 };
}

export default connect(
  mapStateToProps,
)(Layout);
