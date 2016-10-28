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
 * @param {Object} selectors The selectors used for data, loading and fetch parameters retrieval from state.
 * @param {dataSelector} selectors.dataSelector Mandatory selector to get the fetched data from state.
 * @param {loadingSelector} selectors.loadingSelector Mandatory selector to get the loading status from state.
 * @param {paramsSelector} selectors.paramsSelector Optional selector to get the fetch parameters, from state.
 * @param {Object} LoadingComponent The component to display when loading.
 */
export default (actionCreator, selectors: {}, LoadingComponent = DefaultLoading) => (BaseComponent) => {
    if (!selectors) {
        console.error(`withFetchingOnMount(${BaseComponent.displayName}) requires at least two selectors, one to retrieve the fetched data and the other to retrieve the loading state.`); // eslint-disable-line max-len, no-console
        if (process.env.NODE_ENV !== 'production') {
            console.log('Pass them withing an object as the second parameter of the withFetchingOnMount call like: `withFetchingOnMount(actionCreator, { dataSelector, loadingSelector })`'); // eslint-disable-line max-len, no-console
        }
    }

    const { dataSelector, loadingSelector, paramsSelector } = selectors;

    if (!dataSelector) {
        console.error(`withFetchingOnMount(${BaseComponent.displayName}) requires the data selector, which retrieve the fetched data from state.`); // eslint-disable-line max-len, no-console
        if (process.env.NODE_ENV !== 'production') {
            console.log('Pass it withing an object as the second parameter of the withFetchingOnMount call like: `withFetchingOnMount(actionCreator, { dataSelector, loadingSelector })`'); // eslint-disable-line max-len, no-console
        }
    }

    if (!loadingSelector) {
        console.error(`withFetchingOnMount(${BaseComponent.displayName}) requires the loading selector, which retrieve the loading status from state.`); // eslint-disable-line max-len, no-console
        if (process.env.NODE_ENV !== 'production') {
            console.log('Pass it withing an object as the second parameter of the withFetchingOnMount call like: `withFetchingOnMount(actionCreator, { dataSelector, loadingSelector })`'); // eslint-disable-line max-len, no-console
        }
    }

    // This will return the component correctly initialized
    const factory = createEagerFactory(BaseComponent);

    const mapStateToProps = (state, ownProps) => ({
        data: dataSelector && dataSelector(state, ownProps),
        loading: dataSelector && loadingSelector(state, ownProps),
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
        data: PropTypes.any, // eslint-disable-line
        params: PropTypes.any, // eslint-disable-line
        loading: PropTypes.bool.isRequired,
    };

    return connect(mapStateToProps, mapDispatchToProps)(WithActionOnMount);
};
