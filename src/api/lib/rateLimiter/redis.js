import { redisRateLimit } from 'koa-ratelimit';
import { createClient } from 'redis';

export default (userOptions) => {
    const { redis, ...options } = userOptions;
    const client = createClient(redis);

    redisRateLimit(client);
};
