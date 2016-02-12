describe('GET', () => {
    before(function* addFixtures() {
        yield fixtureLoader.loadDefaultFixtures();
    });
    it('should not require authentification', function* shouldNotRequireAuthentification() {
        const { statusCode } = yield request({
            method: 'GET',
            url: '/api/products',
        });
        assert.equal(statusCode, 200);
    });
    it('should return a list of all products', function* shouldReturnAllProductsList() {
        const { body } = yield request({
            method: 'GET',
            url: '/api/products',
        });
        assert.equal(body.length, 1);
    });
    after(function* removeFixtures() {
        yield fixtureLoader.removeAllFixtures();
    });
});
