import coBody from 'co-body';
import config from 'config';
import koa from 'koa';
import koaRoute from 'koa-route';
import koaMount from 'koa-mount';
import jwt from 'jsonwebtoken';
import userRepositoryFactory from '../users/userModel';
import authenticateRoutes from './authenticateRoutes';

const app = koa();
let userRepository;

app.use(function* init(next) {
    userRepository = userRepositoryFactory(this.client);

    yield next;
});

app.use(koaMount('/authenticate', authenticateRoutes));

app.use(koaRoute.post('/sign-up', function* () {
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
