/* eslint-disable func-names */
import config from 'config';
import { assert } from 'chai';
import request from '../../lib/request';
import fixturesFactory from '../../lib/fixturesLoader';
import dbClient from '../../../src/api/lib/db/client';

describe('/api/products/{id}', () => {
    let fixtureLoader;
    let product;
    before(function* addFixtures() {
        const db = yield dbClient(config.apps.api.db);
        fixtureLoader = fixturesFactory(db.client);

        yield fixtureLoader.loadDefaultFixtures();
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
    });
});
