/* eslint-disable func-names */
import config from 'config';
import { assert } from 'chai';
import { PgPool } from 'co-postgres-queries';

import request from '../lib/request';
import fixturesFactory from '../lib/fixturesLoader';

describe('/api/products', () => {
    describe('GET', () => {
        let fixtureLoader;
        let db;
        let pool;

        before(function* addFixtures() {
            pool = new PgPool(config.apps.api.db);
            db = yield pool.connect();
            fixtureLoader = fixturesFactory(db);

            yield fixtureLoader.loadDefaultFixtures();
        });
        it('should not require authentification', function* () {
            const { statusCode, body } = yield request({
                method: 'GET',
                url: '/api/products',
            });
            assert.equal(statusCode, 200, JSON.stringify(body));
        });
        it('should return a list of all products', function* () {
            const { body } = yield request({
                method: 'GET',
                url: '/api/products',
            });
            assert.equal(body.length, 3);
            const requestedProducts = body.map(product => {
                const p = Object.assign({}, product);
                delete p.id;
                delete p.totalcount;
                return p;
            });
            assert.deepEqual(requestedProducts, [
                {
                    reference: 'abc',
                    width: 30,
                    height: 40,
                    price: 3.40,
                    thumbnail: 'http://lorempixel.com/400/400/',
                    image: 'http://lorempixel.com/400/400/',
                    description: 'John the zoo',
                    stock: 10,
                },
                {
                    reference: 'efg',
                    width: 30,
                    height: 40,
                    price: 3.40,
                    thumbnail: 'http://lorempixel.com/400/400/',
                    image: 'http://lorempixel.com/400/400/',
                    description: 'Frank on toilet',
                    stock: 10,
                },
                {
                    reference: 'hij',
                    width: 30,
                    height: 40,
                    price: 3.40,
                    thumbnail: 'http://lorempixel.com/400/400/',
                    image: 'http://lorempixel.com/400/400/',
                    description: 'Miles in the kitchen',
                    stock: 10,
                },
            ]);
        });
        after(function* removeFixtures() {
            yield fixtureLoader.removeAllFixtures();
            db.release();
            pool.end();
        });
    });
    describe('POST', () => {
        it('should not allow POST request', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: '/api/products',
            });
            assert.equal(statusCode, 405);
        });
    });
    describe('PUT', () => {
        it('should not allow PUT request', function* () {
            const { statusCode } = yield request({
                method: 'PUT',
                url: '/api/products',
            });
            assert.equal(statusCode, 405);
        });
    });
    describe('DELETE', () => {
        it('should not allow DELETE request', function* () {
            const { statusCode } = yield request({
                method: 'DELETE',
                url: '/api/products',
            });
            assert.equal(statusCode, 405);
        });
    });
});
