import { expect } from 'chai';
import sinon from 'sinon';
import { call, put, take } from 'redux-saga/effects';
import { loadOrders as loadOrdersSaga } from './orderSagas';
import { LOAD_ORDERS, loadOrders, ordersLoaded } from './orderActions';

describe('orderSagas', () => {
    describe('loadOrders', () => {
        it('should starts on LOAD_ORDERS action', () => {
            const saga = loadOrdersSaga(undefined, () => ({ user: { token: 'blublu' } }));

            expect(saga.next(loadOrders()).value).to.deep.equal(take(LOAD_ORDERS));
        });

        it('should call the fetchOrders function', () => {
            const fetchOrders = sinon.spy();
            const saga = loadOrdersSaga(fetchOrders, () => ({ user: { token: 'blublu' } }));

            saga.next();

            expect(saga.next().value).to.deep.equal(call(fetchOrders, 'blublu'));
        });

        it('should put the ordersLoaded action with orders on successfull fetch', () => {
            const fetchOrders = sinon.spy();
            const saga = loadOrdersSaga(fetchOrders, () => ({ user: { token: 'blublu' } }));

            saga.next();
            saga.next();

            expect(saga.next({
                orders: [ { id: 42 } ],
                status: 200,
            }).value).to.deep.equal(put(ordersLoaded([ { id: 42 } ])));
        });

        it('should put the ordersLoaded action with error on failed fetch', () => {
            const fetchOrders = sinon.spy();
            const saga = loadOrdersSaga(fetchOrders, () => ({ user: { token: 'blublu' } }));
            const error = new Error('Run you fools');

            saga.next();
            saga.next();

            expect(saga.next({
                error,
                status: 500,
            }).value).to.deep.equal(put(ordersLoaded(error)));
        });
    });
});
