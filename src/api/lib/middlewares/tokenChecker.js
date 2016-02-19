import crypto from 'crypto';
import config from 'config';
import jwt from 'jsonwebtoken';

export default function* (next) {
    const token = this.get('Authorization');
    const cookieToken = this.cookies.get('token');
    const expectedCookieToken = crypto.createHmac('sha256', config.apps.api.security.secret)
        .update(token)
        .digest('hex');

    if (cookieToken !== expectedCookieToken) {
        this.status = 401;
        return;
    }

    try {
        this.user = yield jwt.verify(token, config.apps.api.security.jwt.privateKey);
    } catch (e) {
        this.status = 401;
        return;
    }

    yield next;
}
