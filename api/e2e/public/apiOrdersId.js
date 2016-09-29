/* eslint-disable func-names */
import config from 'config';
import { assert } from 'chai';
import { PgPool } from 'co-postgres-queries';

import request from '../lib/request';
import fixturesFactory from '../lib/fixturesLoader';

import userFactory from '../../src/users/userModel';
import orderFactory from '../../src/orders/orderModel';

describe('/api/orders/{id}', () => {
    let fixtureLoader;
    let db;
    let pool;
    let orderQueries;
    let orders;
    let user1;
    let user2;
    let user1Token;
    let user1CookieToken;

    before(function* addFixtures() {
        pool = new PgPool(config.apps.api.db);
        db = yield pool.connect();
        fixtureLoader = fixturesFactory(db);

        yield fixtureLoader.loadDefaultFixtures();
        const userRepository = userFactory(db);
        orderQueries = orderFactory(db);
        user1 = yield userRepository.findByEmail('user1@marmelab.io');
        user2 = yield userRepository.findByEmail('user2@marmelab.io');
        user1Token = yield fixtureLoader.getTokenFor('user1@marmelab.io');
        user1CookieToken = yield fixtureLoader.getCookieTokenFor('user1@marmelab.io');
        orders = yield {
            orderUser1: orderQueries.insertOne({
                reference: 'ref1',
                date: new Date(),
                customer_id: user1.id,
                total: 6.8,
                status: 'valid',
                products: [],
            }),
            orderUser2: orderQueries.insertOne({
                reference: 'ref1',
                date: new Date(),
                customer_id: user2.id,
                total: 6.8,
                status: 'valid',
                products: [],
            }),
        };
    });
    describe('GET', () => {
        it('should require authentification', function* () {
            const { statusCode } = yield request({
                method: 'GET',
                url: `/api/orders/${orders.orderUser1.id}`,
            });
            assert.equal(statusCode, 401);
        });
        it('should require authentification without cookie token', function* () {
            const { statusCode } = yield request({
                method: 'GET',
                url: `/api/orders/${orders.orderUser1.id}`,
            }, user1Token);
            assert.equal(statusCode, 401);
        });
        it('should require authentification with only cookie token', function* () {
            const { statusCode } = yield request({
                method: 'GET',
                url: `/api/orders/${orders.orderUser1.id}`,
            }, null, { token: user1CookieToken });
            assert.equal(statusCode, 401);
        });
        it('should return data about a specific order', function* () {
            const { statusCode, body } = yield request({
                url: `/api/orders/${orders.orderUser1.id}`,
            }, user1Token, { token: user1CookieToken });

            assert.equal(statusCode, 200, JSON.stringify(body));
            delete body.id;
            delete body.date;
            assert.deepEqual(body, {
                reference: 'ref1',
                customer_id: user1.id,
                total: 6.80,
                status: 'valid',
                products: [],
            });
        });
    });
    describe('DELETE', () => {
        it('should require authentification', function* () {
            const { statusCode } = yield request({
                method: 'DELETE',
                url: `/api/orders/${orders.orderUser1.id}`,
            });
            assert.equal(statusCode, 401);
        });
        it('should require authentification without cookie token', function* () {
            const { statusCode } = yield request({
                method: 'DELETE',
                url: `/api/orders/${orders.orderUser1.id}`,
            });
            assert.equal(statusCode, 401);
        }, user1Token);
        it('should require authentification with onlycookie token', function* () {
            const { statusCode } = yield request({
                method: 'DELETE',
                url: `/api/orders/${orders.orderUser1.id}`,
            });
            assert.equal(statusCode, 401);
        }, null, { token: user1CookieToken });
        it('should delete a specific order', function* () {
            const newOrder = yield orderQueries.insertOne({
                reference: 'ref1',
                date: new Date(),
                customer_id: user1.id,
                total: 6.8,
                status: 'valid',
                products: [],
            });
            let userOrders = yield orderQueries.selectByUserId(user1.id);
            assert.equal(userOrders.length, 2);
            const { statusCode, body } = yield request({
                method: 'DELETE',
                url: `/api/orders/${newOrder.id}`,
            }, user1Token, { token: user1CookieToken });

            assert.equal(statusCode, 200, JSON.stringify(body));
            userOrders = yield orderQueries.selectByUserId(user1.id);
            assert.equal(userOrders.length, 1);
        });
    });
    after(function* removeFixtures() {
        yield fixtureLoader.removeAllFixtures();
        db.release();
        pool.end();
    });
});
