module.exports = {
    after: function (client) {
        client.end();
    },

    'Products - user should see the product list': function (client) {
        client
            .url('http://localhost:8081/frontend#/products')
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('.product-item', 1000, false, function () {
                client.getLog('browser', function (result) {
                    console.error(result);
                });
            });
    },

    'Products - user should see the product details': function (client) {
        client
            .url('http://localhost:8081/frontend#/products/1')
            .waitForElementVisible('.product-details', 5000);

        client.expect.element('.img-thumbnail').to.be.visible;
        client.expect.element('.img-thumbnail').to.have.attribute('src', 'http://lorempixel.com/400/400/');
        client.expect.element('h2').text.to.equal('abc');
        client.expect.element('.description').text.to.equal('John the zoo');
        client.expect.element('.price').text.to.equal('Price: $3.40');
    },
};
