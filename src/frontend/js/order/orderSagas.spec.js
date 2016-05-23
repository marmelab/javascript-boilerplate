import { expect } from 'chai';
import { routerActions } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import sinon from 'sinon';

import orderActions from './orderActions';
import { newOrder as newOrderSaga } from './orderSagas';
import { clearShoppingCart } from '../shoppingcart/shoppingCartActions';

describe('orderSagas', () => {
    describe('newOrder', () => {
        const fetchNewOrder = sinon.spy();
        const jwtAccessor = sinon.stub().returns('blublu');
        const action = {
            payload: [{
                id: 42,
            }, {
                id: 84,
            }],
        };

        it('should call the fetchOrders function', () => {
            const saga = newOrderSaga(fetchNewOrder, jwtAccessor)(action);

            expect(saga.next().value).to.deep.equal(call(fetchNewOrder, [{
                id: 42,
            }, {
                id: 84,
            }], 'blublu'));
        });

        it('should put the orderActions.order.success action with order on successfull fetch', () => { // eslint-disable-line max-len
            const saga = newOrderSaga(fetchNewOrder, jwtAccessor)(action);
            saga.next();

            expect(saga.next({
                order: { id: 42 },
            }).value).to.deep.equal(put(orderActions.order.success({ id: 42 })));
        });

        it('should put the clearShoppingCart action with order on successfull fetch', () => {
            const saga = newOrderSaga(fetchNewOrder, jwtAccessor)(action);
            saga.next();
            saga.next({
                order: { id: 42 },
            });

            expect(saga.next().value).to.deep.equal(put(clearShoppingCart()));
        });

        it('should put the routerActions.push action with orders on successfull fetch', () => {
            const saga = newOrderSaga(fetchNewOrder, jwtAccessor)(action);
            saga.next();
            saga.next({
                order: { id: 42 },
            });
            saga.next();

            expect(saga.next().value).to.deep.equal(put(routerActions.push('/orders/42')));
        });

        it('should put the orderActions.order.failure action with error on failed fetch', () => {
            const error = new Error('Run you fools');
            const saga = newOrderSaga(fetchNewOrder, jwtAccessor)(action);
            saga.next();

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(orderActions.order.failure(error)));
        });
    });
});
