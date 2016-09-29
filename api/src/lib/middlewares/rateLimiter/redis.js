import { redisRateLimit } from 'koa-ratelimiter';
import { createClient } from 'redis';
import omit from 'lodash.omit';

export default (options) => {
    const redis = options.redis;
    const limiterOptions = omit(options, 'redis');
    const db = createClient(redis);

    return redisRateLimit(Object.assign({}, limiterOptions, {
        db,
    }));
};
