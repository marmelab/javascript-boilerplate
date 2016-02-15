/* eslint func-names:0 */

describe('/api/products/{id}', () => {
    let product;
    before(function* addFixtures() {
        product = yield fixtureLoader.addProduct();
    });
    describe('GET', () => {
        it('should not require authentification', function* shouldNotRequireAuthentification() {
            const { statusCode } = yield request({
                method: 'GET',
                url: `/api/products/${product.id}`,
            });
            assert.equal(statusCode, 200);
        });
        it('should return information about a specific products', function* shouldReturnAllProductsList() {
            const { body } = yield request({
                method: 'GET',
                url: `/api/products/${product.id}`,
            });
            assert.deepEqual(body, product);
        });
    });
    describe('POST', () => {
        it('should not allow POST request', function* () {
            const { statusCode } = yield request({
                method: 'POST',
                url: `/api/products/${product.id}`,
            });
            assert.equal(statusCode, 405);
        });
    });
    describe('PUT', () => {
        it('should not allow PUT request', function* () {
            const { statusCode } = yield request({
                method: 'PUT',
                url: `/api/products/${product.id}`,
            });
            assert.equal(statusCode, 405);
        });
    });
    describe('DELETE', () => {
        it('should not allow DELETE request', function* () {
            const { statusCode } = yield request({
                method: 'DELETE',
                url: `/api/products/${product.id}`,
            });
            assert.equal(statusCode, 405);
        });
    });
    after(function* removeFixtures() {
        yield fixtureLoader.removeAllFixtures();
    });
});
