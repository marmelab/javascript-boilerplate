/* eslint func-names:0 no-undef:0*/

describe('/api/orders', () => {
    describe('GET', () => {
        before(function* addFixtures() {
            yield fixtureLoader.loadDefaultFixtures();
        });
        it('should require authentification', function* () {
            const { statusCode } = yield request({
                method: 'GET',
                url: '/api/orders',
            });
            assert.equal(statusCode, 401);
        });
        after(function* removeFixtures() {
            yield fixtureLoader.removeAllFixtures();
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
});
