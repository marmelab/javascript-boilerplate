import { redisRateLimit } from 'koa-ratelimiter';
import { createClient } from 'redis';

export default (options) => {
    const { redis, ...limiterOptions } = options;
    const db = createClient(redis);

    return redisRateLimit({
        ...limiterOptions,
        db,
    });
};
