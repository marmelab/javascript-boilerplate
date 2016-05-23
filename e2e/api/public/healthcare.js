describe('/healthcare', () => {
    describe('GET', () => {
        it('should return an object describing the API health', function* () {
            const { statusCode, body } = yield request({
                method: 'GET',
                url: '/healthcare',
            });
            assert.equal(statusCode, 200, JSON.stringify(body));
            assert.deepEqual(body, {
                api: 'OK',
                db: 'OK',
                internetAccess: 'OK',
            });
        });
    });
});
