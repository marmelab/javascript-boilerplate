/* eslint-disable func-names */
import config from 'config';
import expect from 'expect';
import omit from 'lodash.omit';
import { PgPool } from 'co-postgres-queries';

import request from '../../../common/e2e/lib/request';
import fixturesFactory from '../../../common/e2e/lib/fixturesLoader';

import userRepositoryFactory from '../../users/userRepository';
import orderRepositoryFactory from '../../orders/orderRepository';

describe('/api/orders/{id}', () => {
    let fixtureLoader;
    let db;
    let pool;
    let orderRepository;
    let user1;
    let user2;
    let orderUser1;
    let orderUser2;
    let user1Token;
    let user1CookieToken;

    before(async () => {
        pool = new PgPool(config.apps.api.db);
        db = await pool.connect();
        fixtureLoader = fixturesFactory(db);

        await fixtureLoader.loadDefaultFixtures();
        const userRepository = userRepositoryFactory(db);
        orderRepository = orderRepositoryFactory(db);
        user1 = await userRepository.findByEmail('user1@marmelab.io');
        user2 = await userRepository.findByEmail('user2@marmelab.io');
        user1Token = await fixtureLoader.getTokenFor('user1@marmelab.io');
        user1CookieToken = await fixtureLoader.getCookieTokenFor('user1@marmelab.io');
        [orderUser1, orderUser2] = await Promise.all([
            orderRepository.saveNewOrder(user1.id, []),
            orderRepository.saveNewOrder(user2.id, []),
        ]);
    });

    describe('GET', () => {
        it('should require authentification', async () => {
            const { body, statusCode } = await request({
                method: 'GET',
                url: `/api/orders/${orderUser1.id}`,
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should require authentification without cookie token', async () => {
            const { body, statusCode } = await request({
                method: 'GET',
                url: `/api/orders/${orderUser1.id}`,
            }, user1Token);
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should require authentification with only cookie token', async () => {
            const { body, statusCode } = await request({
                method: 'GET',
                url: `/api/orders/${orderUser1.id}`,
            }, null, { token: user1CookieToken });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should return data about a specific order', async () => {
            const { body, statusCode } = await request({
                url: `/api/orders/${orderUser1.id}`,
            }, user1Token, { token: user1CookieToken });

            expect(statusCode).toEqual(200, JSON.stringify(body));
            expect(Object.assign({}, omit(body, 'date'))).toEqual(Object.assign({}, omit(orderUser1, 'date')));
            expect(new Date(body.date)).toEqual(new Date(orderUser1.date));
        });
    });

    describe('DELETE', () => {
        it('should require authentification', async () => {
            const { body, statusCode } = await request({
                method: 'DELETE',
                url: `/api/orders/${orderUser1.id}`,
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        });

        it('should require authentification without cookie token', async () => {
            const { body, statusCode } = await request({
                method: 'DELETE',
                url: `/api/orders/${orderUser1.id}`,
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        }, user1Token);

        it('should require authentification with onlycookie token', async () => {
            const { body, statusCode } = await request({
                method: 'DELETE',
                url: `/api/orders/${orderUser1.id}`,
            });
            expect(statusCode).toEqual(401, JSON.stringify(body));
        }, null, { token: user1CookieToken });

        it('should delete a specific order', async () => {
            const newOrder = await orderRepository.insertOne({
                reference: 'ref1',
                date: new Date(),
                customer_id: user1.id,
                total: 6.8,
                status: 'valid',
                products: [],
            });
            let userOrders = await orderRepository.selectByUserId(user1.id);
            expect(userOrders.length).toEqual(2);
            const { body, statusCode } = await request({
                method: 'DELETE',
                url: `/api/orders/${newOrder.id}`,
            }, user1Token, { token: user1CookieToken });

            expect(statusCode).toEqual(200, JSON.stringify(body));
            userOrders = await orderRepository.selectByUserId(user1.id);
            expect(userOrders.length).toEqual(1);
        });
    });

    after(async () => {
        await fixtureLoader.removeAllFixtures();
        db.release();
        pool.end();
    });
});
