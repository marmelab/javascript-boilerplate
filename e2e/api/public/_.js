/* eslint func-names:0 no-undef:0*/

describe('/api', () => {
    describe('GET', () => {
        it('should not require authentification', function* () {
            const { statusCode } = yield request({
                method: 'GET',
                url: '/api',
            });
            assert.equal(statusCode, 200);
        });
    });
    describe('POST', () => {
        it('should not allow POST request', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: '/api',
            });
            assert.equal(statusCode, 405);
        });
    });
    describe('PUT', () => {
        it('should not allow PUT request', function* () {
            const { statusCode } = yield request({
                method: 'PUT',
                url: '/api',
            });
            assert.equal(statusCode, 405);
        });
    });
    describe('DELETE', () => {
        it('should not allow DELETE request', function* () {
            const { statusCode } = yield request({
                method: 'DELETE',
                url: '/api',
            });
            assert.equal(statusCode, 405);
        });
    });
});
