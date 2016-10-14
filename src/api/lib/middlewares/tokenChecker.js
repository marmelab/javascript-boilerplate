/* eslint no-param-reassign: off */
import crypto from 'crypto';
import config from 'config';
import jwt from 'jsonwebtoken';
import omit from 'lodash.omit';

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
        const tokenData = await jwt.verify(token, config.apps.api.security.jwt.privateKey);

        ctx.user = omit(tokenData, 'expires');
    } catch (e) {
        ctx.status = 401;
        return;
    }

    await next();
};
