import config from 'config';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import uuid from 'uuid';
import crypto from 'crypto';

import data from '../fixtures/demo_fixtures.json';
import productRepositoryFactory from '../../../api/products/productRepository';
import userRepositoryFactory from '../../../api/users/userRepository';

export default function (client) {
    const productRepository = productRepositoryFactory(client);
    const userRepository = userRepositoryFactory(client);

    async function loadDefaultFixtures() {
        await productRepository.batchInsert(data.products);
        await userRepository.batchInsert(data.users);
    }

    async function removeAllFixtures() {
        await client.query({ sql: 'TRUNCATE product RESTART IDENTITY' });
        await client.query({ sql: 'TRUNCATE user_order RESTART IDENTITY' });
        await client.query({ sql: 'TRUNCATE user_account RESTART IDENTITY' });
    }

    async function getTokenFor(email) {
        const user = await userRepository.findByEmail(email);
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

        return await productRepository.insertOne(Object.assign({}, defaultProductData, productData));
    }

    return {
        loadDefaultFixtures,
        removeAllFixtures,
        getTokenFor,
        getCookieTokenFor,
        addProduct,
    };
}
