/* globals FRONTEND__APP__ENABLE_DEV_TOOLS */
import { applyMiddleware, compose, createStore } from 'redux';
import history from './history';
import { syncHistory } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import fetchMiddlewareFactory from './fetchMiddleware';

export default function configureStore(reducers, routes, initialState) {
    let enhancers = [
        applyMiddleware(
            thunkMiddleware,
            syncHistory(history),
            fetchMiddlewareFactory(fetch, window.sessionStorage)
        ),
    ];

    if (FRONTEND__APP__ENABLE_DEV_TOOLS) {
        const DevTools = require('./DevTools');
        enhancers = [
            ...enhancers,
            DevTools.instrument(),
            require('redux-devtools').persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
        ];
    }

    return createStore(reducers, initialState, compose(...enhancers));
}
