import { expect } from 'chai';
import sinon from 'sinon';
import { call, put } from 'redux-saga/effects';

import productActions from './productActions';

import {
    loadProduct as loadProductSagaFactory,
    loadProducts as loadProductsSagaFactory,
} from './productSagas';

describe('productSagas', () => {
    describe('loadProducts', () => {
        const fetchProducts = sinon.spy();
        const loadProductsSaga = loadProductsSagaFactory(fetchProducts);

        it('should call the fetchProducts function', () => {
            const saga = loadProductsSaga(productActions.list.request());

            expect(saga.next().value).to.deep.equal(call(fetchProducts, undefined));
        });

        it('should put the productActions.list.success action with products on successfull fetch', () => { // eslint-disable-line max-len
            const saga = loadProductsSaga(productActions.list.request());

            saga.next();

            expect(saga.next({
                list: [{
                    id: 42,
                }],
            }).value).to.deep.equal(put(productActions.list.success([{
                id: 42,
            }])));
        });

        it('should put the productActions.list.failure action with error on failed fetch', () => {
            const saga = loadProductsSaga(productActions.list.request());
            const error = new Error('Run you fools');

            saga.next();

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(productActions.list.failure(error)));
        });
    });

    describe('loadProduct', () => {
        const fetchProduct = sinon.spy();
        const loadProductSaga = loadProductSagaFactory(fetchProduct);

        it('should call the fetchProduct function', () => {
            const saga = loadProductSaga(productActions.item.request('product_id'));

            expect(saga.next().value).to
                .deep.equal(call(fetchProduct, 'product_id', undefined));
        });

        it('should put the productActions.item.success action with products on successfull fetch', () => { // eslint-disable-line max-len
            const saga = loadProductSaga(productActions.item.request('product_id'));

            saga.next();

            expect(saga.next({
                item: {
                    id: 42,
                },
            }).value).to.deep.equal(put(productActions.item.success({
                id: 42,
            })));
        });

        it('should put the productActions.item.failure action with error on failed fetch', () => {
            const saga = loadProductSaga(productActions.item.request('product_id'));
            const error = new Error('Run you fools');

            saga.next();
            expect(saga.next({
                error,
            }).value).to.deep.equal(put(productActions.item.failure(error)));
        });
    });
});
