import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import history from './history';
import routes from './routes';

const Root = ({ store }) => {
    if (FRONTEND__APP__ENABLE_DEV_TOOLS) { // eslint-disable-line no-undef
        const DevTools = require('./DevTools');

        return (
            <Provider {...{store}}>
                <div>
                    <Router history={history} routes={routes} />
                    <DevTools />
                </div>
            </Provider>
        );
    }

    return (
        <Provider {...{store}}>
            <Router history={history} routes={routes} />
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
