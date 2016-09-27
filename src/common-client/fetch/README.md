# Fetch utilities for redux and redux-saga

## Getting started

We want to set up some actions, reducers and sagas for a product entity. We need to be able to:
- list all products with pagination
- get a single product
- display a loading component while fetching data

Let's start by defining our actions:

```js
// products/actions.js
import { createAction } from 'redux-actions'; // This helps reducing boilerplate for FSA actions
import createFetchActionTypes from 'common-client/createFetchActionTypes';

// Generate constants for our actions
export const productActionTypes = {
    item: createFetchActionTypes('PRODUCT'), // will be used to fetch a specific product
    list: createFetchActionTypes('PRODUCTS') // will be used to fetch a page of products,
};

// Generate action ([FSA](https://github.com/acdlite/flux-standard-action)) creators for all our types
export default {
    item: {
        // action will be { type: 'PRODUCT_REQUEST', payload: { id } }
        request: createAction(productActionTypes.item.REQUEST, id => ({ id })),
        // action will be { type: 'PRODUCT_SUCCESS', payload: [PRODUCT FROM FETCH] }
        success: createAction(productActionTypes.item.SUCCESS),
        // action will be { type: 'PRODUCT_FAILURE', error: [ERROR FROM FETCH] }
        failure: createAction(productActionTypes.item.FAILURE),
    },
    list: {
        // action will be { type: 'PRODUCTS_REQUEST', payload: { body: { page } } }
        request: createAction(productActionTypes.list.REQUEST, page => ({ body: { page }})),
        // action will be { type: 'PRODUCTS_SUCCESS', payload: [PRODUCT FROM FETCH] }
        success: createAction(productActionTypes.list.SUCCESS),
        // action will be { type: 'PRODUCTS_FAILURE', error: [ERROR FROM FETCH] }
        failure: createAction(productActionTypes.list.FAILURE),
    },
};
```

Now let's define a workflow using sagas:
```js
// products/sagas.js
import productActions, { productActionTypes } from './actions';

import fetchFactory from 'common-client/fetch/fetch';
import { entityFactory } from 'common-client/fetch/sagas';

export default entityFactory(productActionTypes, productActions, fetchFactory('products'), fetchFactory('product'));
```

We defined two sagas here: one will handle the `item` actions, the other the `list` actions.

Whenever the `productActions.item.request` is dispatched, a saga will run and will dispatch:
- the `productActions.item.success` action with the fetched product if successull
- the `productActions.item.failure` action with the error if failed.

Whenever the `productActions.list.request` is dispatched, a saga will run and will dispatch:
- the `productActions.list.success` action with the fetched products if successull
- the `productActions.list.failure` action with the error if failed.

Then, we need a reducer for our store:
```js
// products/reducer.js
import { createEntityReducer } from 'common-client/fetch/reducers';
import { productActionTypes } from './actions';

export default createEntityReducer(productActionTypes);

export const getProductById = (state, productId) =>
    (state.product.list.length ? undefined : state.product.list.find(p => p.id === productId));
```

`createEntityReducer` generates a reducer with the following initial state:
```js
{
    // will contain the error from the payload of either `productActions.item.failure` or `productActions.list.failure` actions
    error: null,

    // will contain the fetched product from the payload of the `productActions.item.success` action
    item: null,

    // will contain the fetched products from the payload of the `productActions.list.success` action
    list: [],

    // will be set to `true` when a `productActions.item.request` or `productActions.list.request` action is dispatched
    // and back to false when the success or failure actions are dispatched
    loading: false,
}
```

Then, we must register our sagas and reducers as usual:
```js
// reducers.js
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import product from './product/reducer';
// ...more reducers here

const rootReducer = combineReducers({
    routing: routerReducer,
    product,
    // ...more reducers here
});

export default rootReducer;
```

```js
// sagas.js
import { fork } from 'redux-saga/effects';
import productSagas from './product/sagas';
// ...more sagas here

export default function* () {
    yield fork(productSagas);
    // ...more sagas here
}
```

Finally, we need a component for displaying the products:
```js
import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import ProductItem from './ProductItem';
import productActions from './actions';
import withFetchingOnMount from '../../../common-client/fetch/withFetchingOnMount';

const ProductList = ({ products }) => (
    <div className="row product-list">
        {products.map(product => (
            <div key={product.id} className="col-xs-12 col-md-6 col-lg-3">
                <ProductItem {... { product }} />
            </div>
        ))}
    </div>
);

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(ProductPropType)),
};

const dataSelector = state => state.product.list;
const loadingSelector = state => state.product.loading;
const mapStateToProps = state => ({ products: state.product.list });
const mapDispatchToProps = ({ orderProduct: addProductToShoppingCart });

export default compose(
    withFetchingOnMount(productActions.list.request, { data: dataSelector, loading: loadingSelector }),
    connect(mapStateToProps, mapDispatchToProps)
)(ProductList);
```
