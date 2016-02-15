/* eslint func-names:0 */

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
            const requestedProducts = body.map(product => {
                delete product.id;
                delete product.totalcount;
                return product;
            });
            assert.deepEqual(requestedProducts, [
                {
                    reference: 'abc',
                    width: 30,
                    height: 40,
                    price: 3.40,
                    thumbnail: 'http://lorempixel.com/60/60/',
                    image: 'http://lorempixel.com/400/400/',
                    description: 'John the zoo',
                    stock: 10,
                },
                {
                    reference: 'efg',
                    width: 30,
                    height: 40,
                    price: 3.40,
                    thumbnail: 'http://lorempixel.com/60/60/',
                    image: 'http://lorempixel.com/400/400/',
                    description: 'Frank on toilet',
                    stock: 10,
                },
                {
                    reference: 'hij',
                    width: 30,
                    height: 40,
                    price: 3.40,
                    thumbnail: 'http://lorempixel.com/60/60/',
                    image: 'http://lorempixel.com/400/400/',
                    description: 'Miles in the kitchen',
                    stock: 10,
                },
            ]);
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
