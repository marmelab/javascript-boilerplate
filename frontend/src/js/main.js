import 'babel-core/register';
import 'babel-polyfill';
import 'expose?$!expose?jQuery!jquery'; // eslint-disable-line import/no-unresolved
import 'expose?$!expose?Tether!tether'; // eslint-disable-line import/no-unresolved

import 'bootstrap';

import FastClick from 'fastclick';
import React from 'react';
import { render } from 'react-dom';

import Root from './Root';
import rootReducer from './reducers';
import configureStore from './configureStore';

const store = configureStore(rootReducer);

FastClick.attach(document.body);

render(
    <Root {...{ store }} />,
    document.getElementById('root')
);
