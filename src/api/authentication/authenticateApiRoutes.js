import crypto from 'crypto';
import coBody from 'co-body';
import config from 'config';
import jwt from 'jsonwebtoken';
import koa from 'koa';
import koaRoute from 'koa-route';
import rateLimiter from '../lib/rateLimiter';
import userRepositoryFactory from '../users/userModel';

const app = koa();
let userRepository;

app.use(function* init(next) {
    userRepository = userRepositoryFactory(this.client);

    yield next;
});

app.use(koaRoute.post('/sign-in', rateLimiter(config.apps.api.security.rateLimitOptions)));

app.use(koaRoute.post('/sign-in', function* signIn() {
    const { email, password } = yield coBody(this);
    const user = yield userRepository.authenticate(email, password);
    if (!user) {
        this.throw('Invalid credentials.', 401);
    }

    const token = jwt.sign(user, config.apps.api.security.jwt.privateKey);
    const cookieToken = crypto.createHmac('sha256', config.apps.api.security.secret)
        .update(token)
        .digest('hex');
    const delay = config.apps.api.security.expirationTokenDelay * 1000;
    const tokenExpires = (new Date((new Date()).getTime() + delay));

    this.cookies.set('token', cookieToken, {
        ...config.apps.api.cookies,
        expires: tokenExpires,
        httpOnly: true,
    });

    this.body = {
        id: user.id,
        email: user.email,
        expires: tokenExpires.getTime(),
        token,
    };
}));

app.use(koaRoute.post('/sign-up', function* signUp() {
    const { email, password } = yield coBody(this);
    const user = yield userRepository.insertOne({email, password});

    if (!user) {
        this.status = 401;
        return;
    }

    this.body = {
        id: user.id,
        email: user.email,
        token: jwt.sign(user, config.apps.api.security.jwt.privateKey),
    };
}));

export default app;
