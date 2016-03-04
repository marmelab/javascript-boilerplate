/* eslint func-names:0 */

import userFactory from '../../../src/api/users/userModel';
import orderFactory from '../../../src/api/orders/orderModel';

describe('/api/orders', () => {
    let user;
    let userToken;
    let userCookieToken;
    before(function* addFixtures() {
        yield fixtureLoader.loadDefaultFixtures();
        const userRepository = userFactory(db.client);
        user = yield userRepository.findByEmail('user1@marmelab.io');
        userToken = yield fixtureLoader.getTokenFor('user1@marmelab.io');
        userCookieToken = yield fixtureLoader.getCookieTokenFor('user1@marmelab.io');
        yield orderFactory(db.client).insertOne({
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
            const { statusCode } = yield request({
                method: 'GET',
                url: '/api/orders',
            });
            assert.equal(statusCode, 401);
        });
        it('should require authentification without cookie token', function* () {
            const { statusCode } = yield request({
                method: 'GET',
                url: '/api/orders',
            }, userToken);
            assert.equal(statusCode, 401);
        });
        it('should require authentification with only cookie token', function* () {
            const { statusCode } = yield request({
                method: 'GET',
                url: '/api/orders',
            }, null, { 'token': userCookieToken });
            assert.equal(statusCode, 401);
        });
        it('should return all connected user\'s orders', function* () {
            const { statusCode, body } = yield request({
                url: '/api/orders',
            }, userToken, { 'token': userCookieToken });

            assert.equal(statusCode, 200, JSON.stringify(body));
            assert.equal(body.length, 1);
            delete body[0].id;
            delete body[0].date;
            assert.deepEqual(body[0], {
                reference: 'ref1',
                customer_id: user.id,
                total: 6.80,
                status: 'valid',
            });
        });
    });
    describe('POST', () => {
        it('should require authentification', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'valid',
                    products: [],
                },
            });
            assert.equal(statusCode, 401);
        });
        it('should require authentification without cookie token', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'valid',
                },
            }, userToken);
            assert.equal(statusCode, 401);
        });
        it('should require authentification with only cookie token', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'valid',
                },
            }, null, { 'token': userCookieToken });
            assert.equal(statusCode, 401);
        });
        it('should create a order', function* () {
            let userOrders = yield orderFactory(db.client).selectByUserId(user.id);
            assert.equal(userOrders.length, 1);
            const { statusCode, body } = yield request({
                method: 'POST',
                url: '/api/orders',
                body: {
                    total: 6.80,
                    status: 'pending',
                    products: [],
                },
            }, userToken, { 'token': userCookieToken });
            assert.equal(statusCode, 200, JSON.stringify(body));
            userOrders = yield orderFactory(db.client).selectByUserId(user.id);
            assert.equal(userOrders.length, 2);
        });
    });
    describe('PUT', () => {
        it('should not allow PUT request', function* () {
            const { statusCode } = yield request({
                method: 'PUT',
                url: '/api/orders',
            });
            assert.equal(statusCode, 405);
        });
    });
    after(function* removeFixtures() {
        yield fixtureLoader.removeAllFixtures();
    });
});
