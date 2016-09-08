/* global angular APP_NAME ADMIN_API_URL */
/* eslint max-len: off */
import React from 'react';
import { render } from 'react-dom';

import Admin from './Admin';

function redirectToLogin() {
    window.location = '/admin/login.html';
}

function logout() {
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expires');
    redirectToLogin();
}

if (!window.localStorage.getItem('token')) redirectToLogin();

const currentTime = (new Date()).getTime();
const tokenExpires = window.localStorage.getItem('expires');

if (tokenExpires && tokenExpires < currentTime) logout();

render(
    <Admin />,
    document.getElementById('root')
);
