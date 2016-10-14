/* eslint no-param-reassign: off */
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export default (ctx, user, config) => {
    const delay = config.expirationTokenDelay * 1000;
    const tokenExpires = (new Date((new Date()).getTime() + delay));
    const tokenData = Object.assign({ expires: tokenExpires }, user);

    const token = jwt.sign(tokenData, config.jwt.privateKey);
    const cookieToken = crypto.createHmac('sha256', config.secret)
        .update(token)
        .digest('hex');

    ctx.cookies.set('token', cookieToken, Object.assign(config.cookies, {
        expires: tokenExpires,
        httpOnly: true,
    }));

    ctx.body = {
        token,
    };
};
