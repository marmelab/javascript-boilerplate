/* eslint-disable func-names */
import config from 'config';
import expect from 'expect';
import { PgPool } from 'co-postgres-queries';

import request from '../../../common/e2e/lib/request';
import fixturesFactory from '../../../common/e2e/lib/fixturesLoader';
import userFactory from '../../users/userModel';
import orderFactory from '../../orders/orderModel';

describe('/api/orders', () => {
    let user;
    let userToken;
    let userCookieToken;
    let fixtureLoader;
    let db;
    let pool;

    before(function* addFixtures() {
        pool = new PgPool(config.apps.api.db);
        db = yield pool.connect();
        fixtureLoader = fixturesFactory(db);

        yield fixtureLoader.loadDefaultFixtures();
        const userRepository = userFactory(db);
        user = yield userRepository.findByEmail('user1@marmelab.io');
        userToken = yield fixtureLoader.getTokenFor('user1@marmelab.io');
        userCookieToken = yield fixtureLoader.getCookieTokenFor('user1@marmelab.io');
        yield orderFactory(db).insertOne({
            reference: 'ref1',
            date: new Date(),
            customer_id: user.id,
            total: 6.8,
            status: 'valid',
            products: [],
        });
    });

    describe('GET', () => {
        it('should require authentification', function* () {
            const { statusCode, body } = yield request({
                method: 'GET',
                url: '/api/orders',
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should require authentification without cookie token', function* () {
            const { statusCode, body } = yield request({
                method: 'GET',
                url: '/api/orders',
            }, userToken);
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should require authentification with only cookie token', function* () {
            const { statusCode, body } = yield request({
                method: 'GET',
                url: '/api/orders',
            }, null, { token: userCookieToken });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should return all connected user\'s orders', function* () {
            const { statusCode, body } = yield request({
                url: '/api/orders',
            }, userToken, { token: userCookieToken });

            expect(statusCode).toEqual(200, JSON.stringify(body));
            expect(body.length).toEqual(1, JSON.stringify(body));
            delete body[0].id;
            delete body[0].date;
            expect(body[0]).toEqual({
                reference: 'ref1',
                customer_id: user.id,
                total: 6.80,
                status: 'valid',
                totalcount: '1',
            });
        });
    });

    describe('POST', () => {
        it('should require authentification', function* () {
            const { statusCode, body } = yield request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'valid',
                    products: [],
                },
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should require authentification without cookie token', function* () {
            const { statusCode, body } = yield request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'valid',
                },
            }, userToken);
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should require authentification with only cookie token', function* () {
            const { statusCode, body } = yield request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'valid',
                },
            }, null, { token: userCookieToken });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should create a order', function* () {
            let userOrders = yield orderFactory(db).selectByUserId(null, null, user.id);
            expect(userOrders.length).toEqual(1);
            const { statusCode, body } = yield request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'pending',
                    products: [],
                },
            }, userToken, { token: userCookieToken });
            expect(statusCode).toEqual(200, JSON.stringify(body));
            userOrders = yield orderFactory(db).selectByUserId(null, null, user.id);
            expect(userOrders.length).toEqual(2);
        });
    });

    describe('PUT', () => {
        it('should not allow PUT request', function* () {
            const { statusCode, body } = yield request({
                method: 'PUT',
                url: '/api/orders',
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
