/* global angular APP_NAME ADMIN_API_URL */
/* eslint max-len: off */
import React from 'react';
import { render } from 'react-dom';
import { Admin, Resource } from 'admin-on-rest';

import restClient from './restClient';
import Layout from './Layout';
import { ProductList, ProductEdit, ProductCreate, ProductIcon } from './products';
import { OrderList, OrderEdit, OrderCreate, OrderIcon } from './orders';

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
    <Admin restClient={restClient(ADMIN_API_URL, () => window.localStorage.getItem('token'), logout)} appLayout={Layout}>
        <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} icon={ProductIcon} />
        <Resource name="orders" list={OrderList} edit={OrderEdit} create={OrderCreate} icon={OrderIcon} />
    </Admin>,
    document.getElementById('root')
);
