/* eslint require-yield: off, func-names: off */
import { expect } from 'chai';
import { routerActions } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';

import { newOrderSaga } from './sagas';
import { clearShoppingCart } from '../shoppingcart/actions';

describe('orderSagas', () => {
    describe('newOrderSaga', () => {
        const fetchNewOrderSaga = function* () { return; };

        const action = {
            payload: [{
                id: 42,
            }, {
                id: 84,
            }],
        };

        it('should call the fetch saga', () => {
            const saga = newOrderSaga(fetchNewOrderSaga)(action);

            expect(saga.next('blublu').value).to.deep.equal(call(fetchNewOrderSaga, {
                payload: [{
                    id: 42,
                }, {
                    id: 84,
                }] }));
        });

        it('should put the clearShoppingCart action with order on successfull fetch', () => {
            const saga = newOrderSaga(fetchNewOrderSaga)(action);
            saga.next();

            expect(saga.next({
                result: { id: 42 },
            }).value).to.deep.equal(put(clearShoppingCart()));
        });

        it('should put the routerActions.push action with orders on successfull fetch', () => {
            const saga = newOrderSaga(fetchNewOrderSaga)(action);
            saga.next();
            saga.next({
                result: { id: 42 },
            });

            expect(saga.next().value).to.deep.equal(put(routerActions.push('/orders/42')));
        });
    });
});
