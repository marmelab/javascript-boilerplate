import 'babel-core/register';
import 'babel-polyfill';
import 'bootstrap';

import FastClick from 'fastclick';
import React from 'react';
import { render } from 'react-dom';

import Root from './Root';
import rootReducer from './reducers';
import sagas from './sagas';
import apolloClient from './graphql';
import configureStore from './configureStore';

const store = configureStore(
    rootReducer({ apollo: apolloClient.reducer() }),
    sagas(apolloClient),
    [apolloClient.middleware()]
);

FastClick.attach(document.body);

render(
    <Root {...{ apolloClient, store }} />,
    document.getElementById('root')
);
