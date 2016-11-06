import React, { PropTypes } from 'react';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';

import routesFactory from './routes';

const Root = ({ apolloClient, store }) => {
    const history = syncHistoryWithStore(hashHistory, store);
    const routes = routesFactory(store);

    return (
        <ApolloProvider store={store} client={apolloClient}>
            <Router {...{ history, routes }} />
        </ApolloProvider>
    );
};

Root.propTypes = {
    apolloClient: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
};

export default Root;
