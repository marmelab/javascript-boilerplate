import bcrypt from 'bcrypt';
import config from 'config';

import userQueries from './userQueries';

const hashUserPassword = user => Object.assign({}, user, {
    password: bcrypt.hashSync(user.password, config.apps.api.security.bcrypt.salt_work_factor),
});

function userModel(client) {
    const userClient = client.link(userModel.queries);

    const insertOne = async (user, isWhitelisted) => await userClient.insertOne(hashUserPassword(user), isWhitelisted);

    const batchInsert = async users => {
        const preparedUsers = users.map(hashUserPassword);

        return await userClient.batchInsert(preparedUsers);
    };

    const findByEmail = async email => {
        const results = await userClient.findByEmail(email);

        return results.length ? results[0] : null;
    };

    const authenticate = async (email, password) => {
        const foundUser = await findByEmail(email);

        if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
            return false;
        }
        return {
            id: foundUser.id,
            email: foundUser.email,
        };
    };

    return Object.assign({}, userClient, {
        insertOne,
        batchInsert,
        findByEmail,
        authenticate,
    });
}

userModel.queries = userQueries;

export default userModel;
