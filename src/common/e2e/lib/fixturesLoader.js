import config from 'config';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import uuid from 'uuid';
import crypto from 'crypto';

import data from '../fixtures/demo_fixtures.json';
import productFactory from '../../../api/products/productModel';
import userFactory from '../../../api/users/userModel';

export default function (client) {
    const productQueries = productFactory(client);
    const userQueries = userFactory(client);

    async function loadDefaultFixtures() {
        await productQueries.batchInsert(data.products);
        await userQueries.batchInsert(data.users);
    }

    async function removeAllFixtures() {
        await client.query({ sql: 'TRUNCATE product RESTART IDENTITY' });
        await client.query({ sql: 'TRUNCATE user_order RESTART IDENTITY' });
        await client.query({ sql: 'TRUNCATE user_account RESTART IDENTITY' });
    }

    async function getTokenFor(email) {
        // const causes an error! don't know why
        const user = await userQueries.findByEmail(email);
        delete user.password;

        return jwt.sign(user, config.apps.api.security.jwt.privateKey);
    }

    async function getCookieTokenFor(email) {
        const token = await getTokenFor(email);

        return crypto.createHmac('sha256', config.apps.api.security.secret)
            .update(token)
            .digest('hex');
    }

    async function addProduct(productData) {
        // const causes an error! don't know why
        const defaultProductData = {
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
        return await productQueries.insertOne(Object.assign({}, defaultProductData, productData));
    }

    return {
        loadDefaultFixtures,
        removeAllFixtures,
        getTokenFor,
        getCookieTokenFor,
        addProduct,
    };
}
