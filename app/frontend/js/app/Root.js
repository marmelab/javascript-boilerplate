import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

const Root = ({ store }) => {
    if (FRONTEND__APP__ENABLE_DEV_TOOLS) { // eslint-disable-line no-undef
        const DevTools = require('common/DevTools').default;

        return (
            <Provider {...{store}}>
                <div>
                    <ReduxRouter />
                    <DevTools />
                </div>
            </Provider>
        );
    }

    return (
        <Provider {...{store}}>
            <ReduxRouter />
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
