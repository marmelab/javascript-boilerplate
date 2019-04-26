import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import Admin from './Admin';

render(
    <Admin />,
    document.getElementById('root')
);
