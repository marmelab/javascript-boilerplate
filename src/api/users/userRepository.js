import bcrypt from 'bcrypt';
import config from 'config';

import userQueries from './userQueries';

export const hashUserPassword = user => Object.assign({}, user, {
    password: bcrypt.hashSync(user.password, config.apps.api.security.bcrypt.salt_work_factor),
});

export const insertOne = userClient =>
    async (user, isWhitelisted) =>
        await userClient.insertOne(hashUserPassword(user), isWhitelisted);

export const batchInsert = userClient =>
    async (users) => {
        const preparedUsers = users.map(hashUserPassword);
        return await userClient.batchInsert(preparedUsers);
    };

export const findByEmail = userClient =>
    async (email) => {
        const results = await userClient.findByEmail(email);
        return results.length ? results[0] : null;
    };

export const selectOneById = userClient => id => userClient.selectOneById({ id });

function userRepository(client) {
    const userClient = client.link(userRepository.queries);

    return Object.assign({}, userClient, {
        insertOne: insertOne(userClient),
        batchInsert: batchInsert(userClient),
        findByEmail: findByEmail(userClient),
        selectOneById: selectOneById(userClient),
    });
}

userRepository.queries = userQueries;

export default userRepository;
