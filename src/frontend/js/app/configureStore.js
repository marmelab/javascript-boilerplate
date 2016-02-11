import { applyMiddleware, compose, createStore } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHashHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import fetchMiddlewareFactory from './fetchMiddleware';

const history = createHashHistory();

export default function configureStore(reducers, routes, initialState) {
    let chain = [
        reduxReactRouter({ history, routes }),
        applyMiddleware(thunkMiddleware, fetchMiddlewareFactory(fetch, window.sessionStorage)),
    ];

    if (FRONTEND__APP__ENABLE_DEV_TOOLS) { // eslint-disable-line no-undef
        const DevTools = require('./DevTools');
        chain = [
            ...chain,
            DevTools.instrument(),
            require('redux-devtools').persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
        ];
    }

    return compose(...chain)(createStore)(reducers, initialState);
}
