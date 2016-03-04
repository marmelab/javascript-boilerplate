import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routesFactory from './routes';

const Root = ({ store }) => {
    const history = syncHistoryWithStore(hashHistory, store);
    const routes = routesFactory(store);

    if (FRONTEND__APP__ENABLE_DEV_TOOLS) { // eslint-disable-line no-undef
        const DevTools = require('./DevTools');

        return (
            <Provider {...{ store }}>
                <div>
                    <Router {...{ history, routes }} />
                    <DevTools />
                </div>
            </Provider>
        );
    }

    return (
        <Provider {...{ store }}>
            <Router {...{ history, routes }} />
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
