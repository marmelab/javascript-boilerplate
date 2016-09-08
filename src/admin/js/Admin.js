/* eslint max-len: off */
/* global angular ADMIN_API_URL */
import React from 'react';

// redux, react-router, and saga form the 'kernel' on which admin-on-rest runs
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Redirect, Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

// prebuilt admin-on-rest features
import { adminReducer, crudSaga, CrudRoute } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';

import restClientFactory from './restClient';
import Layout from './Layout';
import { OrderList, OrderEdit, OrderCreate } from './orders';
import { OrderProductList, OrderProductEdit } from './order-products';
import { ProductList, ProductEdit, ProductCreate } from './products';

// create a Redux app
const reducer = combineReducers({
    admin: adminReducer([{ name: 'products' }, { name: 'orders' }, { name: 'order-products' }]),
    routing: routerReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, undefined, compose(
    applyMiddleware(routerMiddleware(hashHistory), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));

const restClient = restClientFactory(ADMIN_API_URL, () => window.localStorage.getItem('token'));
sagaMiddleware.run(crudSaga(restClient));

// initialize the router
const history = syncHistoryWithStore(hashHistory, store);

// bootstrap redux and the routes
const App = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Layout}>
                <Redirect from="/" to="orders" />
                <CrudRoute key="products" path="products" list={ProductList} edit={ProductEdit} create={ProductCreate} remove={Delete} />
                <CrudRoute key="orders" path="orders" list={OrderList} edit={OrderEdit} create={OrderCreate} remove={Delete} />
                <CrudRoute key="order-products" path="order-products" list={OrderProductList} edit={OrderProductEdit} remove={Delete} options={{ hideInMenu: true }} />
            </Route>
        </Router>
    </Provider>
);

export default App;
