import { expect } from 'chai';
import sinon from 'sinon';
import { call, put, take } from 'redux-saga/effects';
import { loadProduct as loadProductSaga, loadProducts as loadProductsSaga } from './productSagas';
import productActions, { productActionTypes } from './productActions';

describe('productSagas', () => {
    describe('loadProducts', () => {
        it('should starts on productActionTypes.list.REQUEST action', () => {
            const saga = loadProductsSaga(undefined);

            expect(saga.next(productActions.list.request()).value).to.deep.equal(take(productActionTypes.list.REQUEST));
        });

        it('should call the fetchProducts function', () => {
            const fetchProducts = sinon.spy();
            const saga = loadProductsSaga(fetchProducts);

            saga.next();

            expect(saga.next().value).to.deep.equal(call(fetchProducts, undefined));
        });

        it('should put the productActions.list.success action with products on successfull fetch', () => {
            const fetchProducts = sinon.spy();
            const saga = loadProductsSaga(fetchProducts);

            saga.next();
            saga.next();

            expect(saga.next({
                list: [{ id: 42 }],
            }).value).to.deep.equal(put(productActions.list.success([{ id: 42 }])));
        });

        it('should put the productActions.list.failure action with error on failed fetch', () => {
            const fetchProducts = sinon.spy();
            const saga = loadProductsSaga(fetchProducts);
            const error = new Error('Run you fools');

            saga.next();
            saga.next();

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(productActions.list.failure(error)));
        });
    });

    describe('loadProduct', () => {
        it('should starts on productActionTypes.item.REQUEST action', () => {
            const saga = loadProductSaga(undefined);

            expect(saga.next(productActions.item.request('product_id')).value).to.deep.equal(take(productActionTypes.item.REQUEST));
        });

        it('should call the fetchProduct function', () => {
            const fetchProduct = sinon.spy();
            const saga = loadProductSaga(fetchProduct);

            saga.next();

            expect(saga.next(productActions.item.request('product_id')).value).to.deep.equal(call(fetchProduct, 'product_id', undefined));
        });

        it('should put the productActions.item.success action with products on successfull fetch', () => {
            const fetchProduct = sinon.spy();
            const saga = loadProductSaga(fetchProduct);

            saga.next();
            saga.next(productActions.item.request('product_id'));

            expect(saga.next({
                item: { id: 42 },
            }).value).to.deep.equal(put(productActions.item.success({ id: 42 })));
        });

        it('should put the productActions.item.failure action with error on failed fetch', () => {
            const fetchProduct = sinon.spy();
            const saga = loadProductSaga(fetchProduct);
            const error = new Error('Run you fools');

            saga.next();
            saga.next(productActions.item.request('product_id'));

            expect(saga.next({
                error,
            }).value).to.deep.equal(put(productActions.item.failure(error)));
        });
    });
});
