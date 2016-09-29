/* eslint no-param-reassign: off */
import crypto from 'crypto';
import config from 'config';
import jwt from 'jsonwebtoken';

export default async (ctx, next) => {
    const token = ctx.get('Authorization');
    const cookieToken = ctx.cookies.get('token');
    const expectedCookieToken = crypto.createHmac('sha256', config.apps.api.security.secret)
        .update(token)
        .digest('hex');

    if (cookieToken !== expectedCookieToken) {
        ctx.status = 401;
        return;
    }

    try {
        ctx.user = await jwt.verify(token, config.apps.api.security.jwt.privateKey);
    } catch (e) {
        ctx.status = 401;
        return;
    }

    await next();
};
