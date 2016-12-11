/* eslint-disable func-names */
import config from 'config';
import expect from 'expect';
import { PgPool } from 'co-postgres-queries';

import request from '../../../common/e2e/lib/request';
import fixturesFactory from '../../../common/e2e/lib/fixturesLoader';
import userRepositoryFactory from '../../users/userRepository';
import orderRepositoryFactory from '../../orders/orderRepository';

describe('/api/orders', () => {
    let user;
    let userToken;
    let userCookieToken;
    let fixtureLoader;
    let db;
    let pool;

    before(async () => {
        pool = new PgPool(config.apps.api.db);
        db = await pool.connect();
        fixtureLoader = fixturesFactory(db);

        await fixtureLoader.loadDefaultFixtures();
        const userRepository = userRepositoryFactory(db);
        user = await userRepository.findByEmail('user1@marmelab.io');
        userToken = await fixtureLoader.getTokenFor('user1@marmelab.io');
        userCookieToken = await fixtureLoader.getCookieTokenFor('user1@marmelab.io');
        await orderRepositoryFactory(db).insertOne({
            reference: 'ref1',
            date: new Date(),
            customer_id: user.id,
            total: 6.8,
            status: 'valid',
            products: [],
        });
    });

    describe('GET', () => {
        it('should require authentification', async () => {
            const { statusCode, body } = await request({
                method: 'GET',
                url: '/api/orders',
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should require authentification without cookie token', async () => {
            const { statusCode, body } = await request({
                method: 'GET',
                url: '/api/orders',
            }, userToken);
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should require authentification with only cookie token', async () => {
            const { statusCode, body } = await request({
                method: 'GET',
                url: '/api/orders',
            }, null, { token: userCookieToken });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should return all connected user\'s orders', async () => {
            const { statusCode, body } = await request({
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
        it('should require authentification', async () => {
            const { statusCode, body } = await request({
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

        it('should require authentification without cookie token', async () => {
            const { statusCode, body } = await request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'valid',
                },
            }, userToken);
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should require authentification with only cookie token', async () => {
            const { statusCode, body } = await request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'valid',
                },
            }, null, { token: userCookieToken });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should create a order', async () => {
            let userOrders = await orderRepositoryFactory(db).selectByUserId(user.id);
            expect(userOrders.length).toEqual(1);
            const { statusCode, body } = await request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'pending',
                    products: [],
                },
            }, userToken, { token: userCookieToken });
            expect(statusCode).toEqual(200, JSON.stringify(body));
            userOrders = await orderRepositoryFactory(db).selectByUserId(user.id);
            expect(userOrders.length).toEqual(2);
        });
    });

    describe('PUT', () => {
        it('should not allow PUT request', async () => {
            const { statusCode, body } = await request({
                method: 'PUT',
                url: '/api/orders',
            });
            expect(statusCode).toEqual(405, JSON.stringify(body));
        });
    });

    after(async () => {
        await fixtureLoader.removeAllFixtures();
        db.release();
        pool.end();
    });
});
