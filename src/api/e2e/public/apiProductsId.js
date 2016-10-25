/* eslint-disable func-names */
import config from 'config';
import expect from 'expect';
import { PgPool } from 'co-postgres-queries';

import request from '../../../common/e2e/lib/request';
import fixturesFactory from '../../../common/e2e/lib/fixturesLoader';

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
            expect(statusCode).toEqual(200, JSON.stringify(body));
        });

        it('should return information about a specific product', function* () {
            const { body } = yield request({
                method: 'GET',
                url: `/api/products/${product.id}`,
            });

            // Have to use Object.assign here because body and product do not have the same prototype
            // See https://github.com/mjackson/expect/issues/153
            expect(Object.assign({}, body)).toEqual(Object.assign({}, product));
        });
    });

    describe('POST', () => {
        it('should not allow POST request', function* () {
            const { body, statusCode } = yield request({
                method: 'POST',
                url: `/api/products/${product.id}`,
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('PUT', () => {
        it('should not allow PUT request', function* () {
            const { body, statusCode } = yield request({
                method: 'PUT',
                url: `/api/products/${product.id}`,
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    describe('DELETE', () => {
        it('should not allow DELETE request', function* () {
            const { body, statusCode } = yield request({
                method: 'DELETE',
                url: `/api/products/${product.id}`,
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });
    after(function* removeFixtures() {
        yield fixtureLoader.removeAllFixtures();
        db.release();
        pool.end();
    });
});
