import { redisRateLimit } from 'koa-ratelimiter';
import { createClient } from 'redis';

export default (options) => {
    const redis = options.redis;
    const db = createClient(redis);

    return redisRateLimit(Object.assign({}, options, {
        db,
        redis: undefined,
    }));
};
