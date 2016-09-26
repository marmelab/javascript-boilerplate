# Fetch utilities for redux and redux-saga

## Getting started

We want to set up some actions, reducers and sagas for a product entity. We need to be able to:
- list all products with pagination
- get a single products
- display a loading component when fetching data

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

Now, we need a reducer for our store:
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
