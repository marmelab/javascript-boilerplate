import { expect } from 'chai';
import sinon from 'sinon';
import { call, put, take } from 'redux-saga/effects';
import { loadProducts as loadProductsSaga } from './productSagas';
import { LOAD_PRODUCTS, loadProducts, productsLoaded } from './productActions';

describe('orderSagas', () => {
    describe('loadProducts', () => {
        it('should starts on LOAD_PRODUCTS action', () => {
            const saga = loadProductsSaga(undefined);

            expect(saga.next(loadProducts()).value).to.deep.equal(take(LOAD_PRODUCTS));
        });

        it('should call the fetchProducts function', () => {
            const fetchProducts = sinon.spy();
            const saga = loadProductsSaga(fetchProducts);

            saga.next();

            expect(saga.next().value).to.deep.equal(call(fetchProducts));
        });

        it('should put the productsLoaded action with products on successfull fetch', () => {
            const fetchProducts = sinon.spy();
            const saga = loadProductsSaga(fetchProducts);

            saga.next();
            saga.next();

            expect(saga.next({
                products: [ { id: 42 } ],
                status: 200,
            }).value).to.deep.equal(put(productsLoaded([ { id: 42 } ])));
        });

        it('should put the productsLoaded action with error on failed fetch', () => {
            const fetchProducts = sinon.spy();
            const saga = loadProductsSaga(fetchProducts);
            const error = new Error('Run you fools');

            saga.next();
            saga.next();

            expect(saga.next({
                error,
                status: 500,
            }).value).to.deep.equal(put(productsLoaded(error)));
        });
    });
});
