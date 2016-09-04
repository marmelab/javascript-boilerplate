import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createEagerFactory from 'recompose/createEagerFactory';
import Loading from './Loading';

export const DefaultLoading = () => (
    <div className="col-xs-12">
        <Loading />
    </div>
);

export default (action, dataStateSelector, paramsStateSelector, loadingStateSelector, LoadingComponent = DefaultLoading) => BaseComponent => {
    // This will return the component correctly initialized
    const factory = createEagerFactory(BaseComponent);

    const mapStateToProps = (state, ownProps) => ({
        data: dataStateSelector(state, ownProps),
        loading: loadingStateSelector(state, ownProps),
        params: paramsStateSelector && paramsStateSelector(state, ownProps),
    });

    const mapDispatchToProps = dispatch => bindActionCreators({
        action,
    }, dispatch);

    class WithActionOnMount extends Component {
        componentDidMount() {
            this.props.action(this.props.params);
        }

        render() {
            const { loading, data, ...props } = this.props;

            if (loading || !data) {
                return <LoadingComponent />;
            }

            return factory({
                ...props,
            });
        }
    }

    WithActionOnMount.propTypes = {
        action: PropTypes.func.isRequired,
        data: PropTypes.any,
        params: PropTypes.any,
        loading: PropTypes.bool.isRequired,
    };

    return connect(mapStateToProps, mapDispatchToProps)(WithActionOnMount);
};
