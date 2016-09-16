/* eslint max-len: off */
/* global angular ADMIN_API_URL */
import React from 'react';

// redux, react-router, and saga form the 'kernel' on which admin-on-rest runs
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Redirect, Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';

// prebuilt admin-on-rest features
import { adminReducer, crudSaga, CrudRoute } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';
import { reducer as form } from 'redux-form';

import restClientFactory from './restClient';
import Layout from './Layout';
import LayoutWithMenu from './LayoutWithMenu';
import { OrderList, OrderEdit, OrderCreate } from './orders';
import { OrderProductList, OrderProductEdit } from './order-products';
import { ProductList, ProductEdit, ProductCreate } from './products';
import SignIn from './user/SignIn';
import userSagas from './user/sagas';
import userReducer from './user/reducer';
import { signOut } from './user/actions';
import redirectIfNotAuthenticatedFactory from './user/redirectIfNotAuthenticated';

// create a Redux app
const reducer = combineReducers({
    admin: adminReducer([{ name: 'products' }, { name: 'orders' }, { name: 'order-products' }]),
    routing: routerReducer,
    user: userReducer(window.localStorage),
    form,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, undefined, compose(
    applyMiddleware(routerMiddleware(hashHistory), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));
const redirectIfNotAuthenticated = redirectIfNotAuthenticatedFactory(store);

const restClient = restClientFactory(ADMIN_API_URL, () => window.localStorage.getItem('token'), () => store.dispatch(signOut.request()));

sagaMiddleware.run(function* () { // eslint-disable-line func-names
    yield fork(crudSaga(restClient));
    yield fork(userSagas);
});

// initialize the router
const history = syncHistoryWithStore(hashHistory, store);

// bootstrap redux and the routes
const App = () => (
    <Provider store={store}>
        <Router history={history}>
            <Redirect from="/" to="/admin/orders" />
            <Route path="/sign-in" component={Layout}>
                <IndexRoute component={SignIn} />
            </Route>
            <Route path="/admin" component={LayoutWithMenu} onEnter={redirectIfNotAuthenticated}>
                <CrudRoute path="products" list={ProductList} edit={ProductEdit} create={ProductCreate} remove={Delete} />
                <CrudRoute path="orders" list={OrderList} edit={OrderEdit} create={OrderCreate} remove={Delete} />
                <CrudRoute path="order-products" list={OrderProductList} edit={OrderProductEdit} remove={Delete} options={{ hideInMenu: true }} />
            </Route>
        </Router>
    </Provider>
);

export default App;
