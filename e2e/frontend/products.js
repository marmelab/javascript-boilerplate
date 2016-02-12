module.exports = {
    after: function(client) {
        client.end();
    },

    'Products - user should see the product list': function(client) {
        client
            .url('http://localhost:8081/frontend#/products')
            .waitForElementVisible('body', 1000)
            .elements('class name', 'product-item', function(result) {
                client.expect(result.value.length).to.equal(5);
            });
    },

    'Products - user should see the product details': function(client) {
        client
            .url('http://localhost:8081/frontend#/products/foo')
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('.product-details', 1000)
            .expect.element('.img-thumbnail').to.be.visible;

        client.expect.element('.img-thumbnail').to.have.attribute('src', 'http://lorempixel.com/640/480/sports');
        client.expect.element('h2').text.to.equal('Foo');
        client.expect.element('.description').text.to.equal('Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.');
        client.expect.element('.price').text.to.equal('Price: $29.99');
    },
};
