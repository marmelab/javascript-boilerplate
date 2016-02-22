import { expect } from 'chai';
import sinon from 'sinon';
import { call, put, take } from 'redux-saga/effects';
import { loadOrder as loadOrderSaga, loadOrders as loadOrdersSaga, newOrder as newOrderSaga } from './orderSagas';
import orderActions, { orderActionTypes } from './orderActions';
import { routeActions } from 'react-router-redux';

describe('orderSagas', () => {
    describe('loadOrders', () => {
        it('should starts on orderActionTypes.list.REQUEST action', () => {
            const saga = loadOrdersSaga(undefined, () => ({ user: { token: 'blublu' } }));

            expect(saga.next(orderActions.list.request()).value).to.deep.equal(take(orderActionTypes.list.REQUEST));
        });

        it('should call the fetchOrders function', () => {
            const fetchOrders = sinon.spy();
            const saga = loadOrdersSaga(fetchOrders, () => 'blublu');

            saga.next();

            expect(saga.next().value).to.deep.equal(call(fetchOrders, 'blublu'));
        });

        it('should put the orderActions.list.success action with orders on successfull fetch', () => {
            const fetchOrders = sinon.spy();
            const saga = loadOrdersSaga(fetchOrders, () => 'blublu');

            saga.next();
            saga.next();

            expect(saga.next({
                list: [ { id: 42 } ],
            }).value).to.deep.equal(put(orderActions.list.success([ { id: 42 } ])));
        });

        it('should put the orderActions.list.failure action with error on failed fetch', () => {
            const fetchOrders = sinon.spy();
            const saga = loadOrdersSaga(fetchOrders, () => 'blublu');
            const error = new Error('Run you fools');

            saga.next();
            saga.next();

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(orderActions.list.failure(error)));
        });
    });

    describe('loadOrder', () => {
        it('should starts on orderActionTypes.item.REQUEST action', () => {
            const saga = loadOrderSaga(undefined);

            expect(saga.next(orderActions.item.request('order_id')).value).to.deep.equal(take(orderActionTypes.item.REQUEST));
        });

        it('should call the fetchProduct function', () => {
            const fetchProduct = sinon.spy();
            const saga = loadOrderSaga(fetchProduct);

            saga.next();

            expect(saga.next(orderActions.item.request('order_id')).value).to.deep.equal(call(fetchProduct, 'order_id', undefined));
        });

        it('should put the orderActions.item.success action with products on successfull fetch', () => {
            const fetchProduct = sinon.spy();
            const saga = loadOrderSaga(fetchProduct);

            saga.next();
            saga.next(orderActions.item.request('order_id'));

            expect(saga.next({
                item: { id: 42 },
            }).value).to.deep.equal(put(orderActions.item.success({ id: 42 })));
        });

        it('should put the orderActions.item.failure action with error on failed fetch', () => {
            const fetchProduct = sinon.spy();
            const saga = loadOrderSaga(fetchProduct);
            const error = new Error('Run you fools');

            saga.next();
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

        it('should starts on orderActionTypes.order.REQUEST action', () => {
            const saga = newOrderSaga(fetchNewOrder, getState);
            expect(saga.next(orderActions.list.request()).value).to.deep.equal(take(orderActionTypes.order.REQUEST));
        });

        it('should call the fetchOrders function', () => {
            const saga = newOrderSaga(fetchNewOrder, getState);
            saga.next();

            expect(saga.next().value).to.deep.equal(call(fetchNewOrder, [{
                id: 42,
            }, {
                id: 84,
            }], 'blublu'));
        });

        it('should put the orderActions.order.success action with order on successfull fetch', () => {
            const saga = newOrderSaga(fetchNewOrder, getState);
            saga.next();
            saga.next();

            expect(saga.next({
                order: { id: 42 },
            }).value).to.deep.equal(put(orderActions.order.success({ id: 42 })));
        });

        it('should put the routeActions.push action with orders on successfull fetch', () => {
            const saga = newOrderSaga(fetchNewOrder, getState);

            saga.next();
            saga.next();
            saga.next({
                order: { id: 42 },
            });

            expect(saga.next().value).to.deep.equal(put(routeActions.push('/orders/42')));
        });

        it('should put the orderActions.order.failure action with error on failed fetch', () => {
            const error = new Error('Run you fools');
            const saga = newOrderSaga(fetchNewOrder, getState);

            saga.next();
            saga.next();

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(orderActions.order.failure(error)));
        });
    });
});
