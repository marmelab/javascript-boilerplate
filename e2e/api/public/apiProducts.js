/* eslint func-names:0 no-undef:0*/

describe('/api/products', () => {
    describe('GET', () => {
        before(function* addFixtures() {
            yield fixtureLoader.loadDefaultFixtures();
        });
        it('should not require authentification', function* () {
            const { statusCode } = yield request({
                method: 'GET',
                url: '/api/products',
            });
            assert.equal(statusCode, 200);
        });
        it('should return a list of all products', function* () {
            const { body } = yield request({
                method: 'GET',
                url: '/api/products',
            });
            assert.equal(body.length, 3);
        });
        after(function* removeFixtures() {
            yield fixtureLoader.removeAllFixtures();
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
