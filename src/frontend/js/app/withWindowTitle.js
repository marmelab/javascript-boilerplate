/* global APP_NAME */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import createEagerFactory from 'recompose/createEagerFactory';
import Helmet from 'react-helmet';

export default titleSelector => (BaseComponent) => {
    // This will return the component correctly initialized
    const factory = createEagerFactory(BaseComponent);

    const mapStateToProps = (state, ownProps) => ({
        title: (typeof titleSelector === 'function') ? titleSelector(state, ownProps) : titleSelector,
    });

    const WithWindowTitle = ({ title, ...props }) => (
        <div className="row">
            <div className="col-xs-12">
                <Helmet title={APP_NAME + (title ? ` - ${title}` : '')} />
                {factory({ ...props })}
            </div>
        </div>
    );

    WithWindowTitle.propTypes = {
        title: PropTypes.string,
    };

    return connect(mapStateToProps)(WithWindowTitle);
};
