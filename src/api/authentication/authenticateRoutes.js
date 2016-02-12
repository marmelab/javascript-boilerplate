import coBody from 'co-body';
import config from 'config';
import jwt from 'jsonwebtoken';
import koa from 'koa';
import koaRoute from 'koa-route';
import methodFilter from '../lib/middlewares/methodFilter';
import rateLimiter from './rateLimiter';
import userRepositoryFactory from '../users/userModel';

const app = koa();

app.use(methodFilter(['POST']));
app.use(koaRoute.post('/', rateLimiter(config.apps.api.security.rateLimitOptions)));

app.use(koaRoute.post('/', function* () {
    const { email, password } = yield coBody(this);
    const userRepository = userRepositoryFactory(this.client);
    const user = yield userRepository.authenticate(email, password);
    if (!user) {
        // already done in userRepository.authenticate. Not sure that it must be done twice ?
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
