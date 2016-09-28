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

/**
 * @callback dataSelector
 * @param {Object} state The current state
 * @param {Object} ownProps The props from the BaseComponent allowing use of things like route parameters
 */

/**
 * @callback paramsSelector
 * @param {Object} state The current state
 * @param {Object} ownProps The props from the BaseComponent allowing use of things like route parameters
 */

/**
 * @callback loadingSelector
 * @param {Object} state The current state
 * @param {Object} ownProps The props from the BaseComponent allowing use of things like route parameters
 */

/**
 * This HOC can be used when a component needs to fetch data on mount.
 *
 * @param actionCreator An action creator
 * @param {dataSelector} dataSelector A selector to retrieve the fetched data from state.
 * @param {paramsSelector} paramsSelector A selector to retrieve the parameters to use for fetch, from state.
 * @param {loadingSelector} loadingSelector A selector to retrieve the loading status from state.
 * @param {Object} LoadingComponent The component to display when loading.
 */
export default (actionCreator, dataSelector, paramsSelector, loadingSelector, LoadingComponent = DefaultLoading) => // eslint-disable-line max-len
    BaseComponent => {
        // This will return the component correctly initialized
        const factory = createEagerFactory(BaseComponent);

        const mapStateToProps = (state, ownProps) => ({
            data: dataSelector(state, ownProps),
            loading: loadingSelector(state, ownProps),
            params: paramsSelector && paramsSelector(state, ownProps),
        });

        const mapDispatchToProps = dispatch => bindActionCreators({
            action: actionCreator,
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

                return factory(props);
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
