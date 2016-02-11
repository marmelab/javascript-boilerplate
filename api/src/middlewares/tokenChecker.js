import config from 'config';
import jwt from 'jsonwebtoken';

export default function* (next) {
    const token = this.get('Authorization');

    try {
        this.user = yield jwt.verify(token, config.jwt.privateKey);
    } catch (e) {
        this.status = 401;
        return;
    }

    yield next;
}
