import crypto from 'crypto';
import coBody from 'co-body';
import config from 'config';
import jwt from 'jsonwebtoken';
import koa from 'koa';
import koaRoute from 'koa-route';
import methodFilter from '../lib/middlewares/methodFilter';
import rateLimiter from '../lib/rateLimiter';
import userRepositoryFactory from '../users/userModel';

const app = koa();

app.use(methodFilter(['POST']));
app.use(koaRoute.post('/', rateLimiter(config.apps.api.security.rateLimitOptions)));

app.use(koaRoute.post('/', function* login() {
    const { email, password } = yield coBody(this);
    const userRepository = userRepositoryFactory(this.client);
    const user = yield userRepository.authenticate(email, password);
    if (!user) {
        this.throw('Invalid credentials.', 401);
    }

    const token = jwt.sign(user, config.apps.api.security.jwt.privateKey);
    const cookieToken = crypto.createHmac('sha256', config.apps.api.security.secret)
        .update(token)
        .digest('hex');

    this.cookies.set('token', cookieToken, {
        ...config.apps.api.cookies,
        httpOnly: true,
    });

    this.body = {
        id: user.id,
        email: user.email,
        token,
    };
}));

export default app;
