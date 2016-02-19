import { expect } from 'chai';
import sinon from 'sinon';
import { call, put, take } from 'redux-saga/effects';
import { loadOrders as loadOrdersSaga } from './orderSagas';
import orderActions, { orderActionTypes } from './orderActions';

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
                status: 200,
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
                status: 500,
            }).value).to.deep.equal(put(orderActions.list.failure(error)));
        });
    });
});
