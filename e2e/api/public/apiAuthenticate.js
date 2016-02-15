/* eslint func-names:0 */

describe('/api/sign-in', () => {
    before(function* addFixtures() {
        yield fixtureLoader.loadDefaultFixtures();
    });

    describe('GET', () => {
        it('should not allow GET request', function* () {
            const { statusCode } = yield request({
                method: 'PUT',
                url: '/api/sign-in',
            });
            assert.equal(statusCode, 405);
        });
    });

    describe('POST', () => {
        it('should return 401 with an empty email and password', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: '',
                    password: '',
                },
            });
            assert.equal(statusCode, 401);
        });
        it('should return 401 with an empty email', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: '',
                    password: 'password',
                },
            });
            assert.equal(statusCode, 401);
        });
        it('should return 401 with an empty password', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: 'user1@marmelab.io',
                    password: '',
                },
            });
            assert.equal(statusCode, 401);
        });
        it('should return 401 with a wrong email', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: 'none@marmelab.io',
                    password: 'password',
                },
            });
            assert.equal(statusCode, 401);
        });
        it('should return 401 with a wrong password', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: 'user1@marmelab.io',
                    password: 'wrongpassword',
                },
            });
            assert.equal(statusCode, 401);
        });
        it('should return 200 with a valid email and password', function* () {
            const { statusCode, body } = yield request({
                method: 'POST',
                url: '/api/sign-in',
                body: {
                    email: 'user1@marmelab.io',
                    password: 'password',
                },
            });
            assert.equal(statusCode, 200, JSON.stringify(body));
        });
    });
    describe('PUT', () => {
        it('should not allow PUT request', function* () {
            const { statusCode } = yield request({
                method: 'PUT',
                url: '/api/sign-in',
            });
            assert.equal(statusCode, 405);
        });
    });
    describe('DELETE', () => {
        it('should not allow DELETE request', function* () {
            const { statusCode } = yield request({
                method: 'DELETE',
                url: '/api/sign-in',
            });
            assert.equal(statusCode, 405);
        });
    });

    after(function* clearFixtures() {
        yield fixtureLoader.removeAllFixtures();
    });
});
