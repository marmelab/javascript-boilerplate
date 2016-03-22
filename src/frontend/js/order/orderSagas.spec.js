import { expect } from 'chai';
import { routerActions } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import sinon from 'sinon';

import orderActions from './orderActions';

import {
    loadOrder as loadOrderSagaFactory,
    loadOrders as loadOrdersSagaFactory,
    newOrder as newOrderSagaFactory,
} from './orderSagas';

import { clearShoppingCart } from '../shoppingcart/shoppingCartActions';

describe('orderSagas', () => {
    describe('loadOrders', () => {
        const fetchOrders = sinon.spy();
        const loadOrdersSaga = loadOrdersSagaFactory(fetchOrders, () => 'blublu');

        it('should call the fetchOrders function', () => {
            const saga = loadOrdersSaga(orderActions.list.request());

            expect(saga.next().value).to.deep.equal(call(fetchOrders, 'blublu'));
        });

        it('should put the orderActions.list.success action with orders on successfull fetch', () => { // eslint-disable-line max-len
            const saga = loadOrdersSaga(orderActions.list.request());

            saga.next();

            expect(saga.next({
                list: [{ id: 42 }],
            }).value).to.deep.equal(put(orderActions.list.success([{ id: 42 }])));
        });

        it('should put the orderActions.list.failure action with error on failed fetch', () => {
            const saga = loadOrdersSaga(orderActions.list.request());
            const error = new Error('Run you fools');

            saga.next();

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(orderActions.list.failure(error)));
        });
    });

    describe('loadOrder', () => {
        const fetchOrder = sinon.spy();
        const loadOrderSaga = loadOrderSagaFactory(fetchOrder, () => 'blublu');

        it('should call the fetchOrder function', () => {
            const saga = loadOrderSaga(orderActions.item.request('order_id'));

            expect(saga.next().value).to
                .deep.equal(call(fetchOrder, 'order_id', 'blublu'));
        });

        it('should put the orderActions.item.success action with products on successfull fetch', () => { // eslint-disable-line max-len
            const saga = loadOrderSaga(orderActions.item.request('order_id'));

            saga.next(orderActions.item.request('order_id'));

            expect(saga.next({
                item: { id: 42 },
            }).value).to.deep.equal(put(orderActions.item.success({ id: 42 })));
        });

        it('should put the orderActions.item.failure action with error on failed fetch', () => {
            const saga = loadOrderSaga(orderActions.item.request('order_id'));
            const error = new Error('Run you fools');

            saga.next(orderActions.item.request('order_id'));

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(orderActions.item.failure(error)));
        });
    });

    describe('newOrder', () => {
        const fetchNewOrder = sinon.spy();
        const getState = sinon.stub().returns({
            user: { token: 'blublu' },
            shoppingCart: {
                products: [{
                    id: 42,
                }, {
                    id: 84,
                }],
            },
        });
        const newOrderSaga = newOrderSagaFactory(fetchNewOrder, getState);

        it('should call the fetchOrders function', () => {
            const saga = newOrderSaga(orderActions.list.request());

            expect(saga.next().value).to.deep.equal(call(fetchNewOrder, [{
                id: 42,
            }, {
                id: 84,
            }], 'blublu'));
        });

        it('should put the orderActions.order.success action with order on successfull fetch', () => { // eslint-disable-line max-len
            const saga = newOrderSaga(orderActions.list.request());

            saga.next();

            expect(saga.next({
                order: { id: 42 },
            }).value).to.deep.equal(put(orderActions.order.success({ id: 42 })));
        });

        it('should put the clearShoppingCart action with order on successfull fetch', () => {
            const saga = newOrderSaga(orderActions.list.request());

            saga.next();
            saga.next({
                order: { id: 42 },
            });

            expect(saga.next().value).to.deep.equal(put(clearShoppingCart()));
        });

        it('should put the routerActions.push action with orders on successfull fetch', () => {
            const saga = newOrderSaga(orderActions.list.request());

            saga.next();
            saga.next({
                order: { id: 42 },
            });
            saga.next();

            expect(saga.next().value).to.deep.equal(put(routerActions.push('/orders/42')));
        });

        it('should put the orderActions.order.failure action with error on failed fetch', () => {
            const error = new Error('Run you fools');
            const saga = newOrderSaga(orderActions.list.request());

            saga.next();

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(orderActions.order.failure(error)));
        });
    });
});
