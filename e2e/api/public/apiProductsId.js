/* eslint-disable func-names */
import config from 'config';
import { assert } from 'chai';
import { PgPool } from 'co-postgres-queries';

import request from '../../lib/request';
import fixturesFactory from '../../lib/fixturesLoader';

describe('/api/products/{id}', () => {
    let fixtureLoader;
    let db;
    let pool;
    let product;

    before(function* addFixtures() {
        pool = new PgPool(config.apps.api.db);
        db = yield pool.connect();
        fixtureLoader = fixturesFactory(db);
        product = yield fixtureLoader.addProduct();
    });

    describe('GET', () => {
        it('should not require authentification', function* () {
            const { statusCode, body } = yield request({
                method: 'GET',
                url: `/api/products/${product.id}`,
            });
            assert.equal(statusCode, 200, JSON.stringify(body));
        });
        it('should return information about a specific products', function* () {
            const { body } = yield request({
                method: 'GET',
                url: `/api/products/${product.id}`,
            });
            assert.deepEqual(body, product);
        });
    });
    describe('POST', () => {
        it('should not allow POST request', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: `/api/products/${product.id}`,
            });
            assert.equal(statusCode, 405);
        });
    });
    describe('PUT', () => {
        it('should not allow PUT request', function* () {
            const { statusCode } = yield request({
                method: 'PUT',
                url: `/api/products/${product.id}`,
            });
            assert.equal(statusCode, 405);
        });
    });
    describe('DELETE', () => {
        it('should not allow DELETE request', function* () {
            const { statusCode } = yield request({
                method: 'DELETE',
                url: `/api/products/${product.id}`,
            });
            assert.equal(statusCode, 405);
        });
    });
    after(function* removeFixtures() {
        yield fixtureLoader.removeAllFixtures();
        db.release();
        pool.end();
    });
});
