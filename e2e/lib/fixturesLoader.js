import config from 'config';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import uuid from 'uuid';

import data from '../fixtures/demo_fixtures.json';
import productFactory from '../../src/api/products/productModel';
import userFactory from '../../src/api/users/userModel';
import orderFactory from '../../src/api/orders/orderModel';

export default function(client) {
    const productQueries = productFactory(client);
    const userQueries = userFactory(client);
    const orderQueries = orderFactory(client);

    function* loadDefaultFixtures() {
        yield productQueries.batchInsert(data.products);
        let users = yield userQueries.batchInsert(data.users);
        let orders = data.orders.map(order => {
            order.customer_id = users.filter(user => user.email === order.customer_id)[0].id;
            order.date = new Date();
            return order;
        });
        yield orderQueries.batchInsert(orders);
    }

    function* removeAllFixtures() {
        yield client.query_('TRUNCATE product CASCADE');
    }

    function* getTokenFor(email) {
        // const causes an error! don't know why
        let user = yield userQueries.findByEmail(email);
        delete user.id;

        return jwt.sign(user, config.apps.api.security.jwt.privateKey);
    }

    function* addProduct(productData) {
        // const causes an error! don't know why
        let defaultProductData = {
            reference: uuid.v1(),
            width: 60,
            height: 40,
            price: faker.random.number(),
            thumbnail: faker.image.imageUrl(60, 60),
            image: faker.image.imageUrl(400, 400),
            description: faker.lorem.sentence(),
            stock: faker.random.number(),
        };

        // ES7, in Babel it is experimental stage 2 and enabled by default
        return yield productQueries.insertOne({ ...defaultProductData, ...productData });
    }

    return {
        loadDefaultFixtures,
        removeAllFixtures,
        getTokenFor,
        addProduct,
    };
}
