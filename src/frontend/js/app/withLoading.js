/* global APP_NAME */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import createEagerFactory from 'recompose/createEagerFactory';

export default loadingSelector => (BaseComponent) => {
    // This will return the component correctly initialized
    const factory = createEagerFactory(BaseComponent);

    const mapStateToProps = (state, ownProps) => ({
        loading: (typeof loadingSelector === 'function') ? loadingSelector(state, ownProps) : loadingSelector,
    });

    const WithWindowTitle = ({ loading, ...props }) => (loading ? (
        <div className="row">
            <div className="col-xs-12">
                <i className="fa fa-spinner fa-spin" />
            </div>
        </div>
    ) : factory({ ...props }));

    WithWindowTitle.propTypes = {
        loading: PropTypes.bool,
    };

    return connect(mapStateToProps)(WithWindowTitle);
};
