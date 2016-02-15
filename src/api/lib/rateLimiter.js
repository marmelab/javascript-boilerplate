/**
 * Simple in-memory rate limiter
 */
import config from 'config';

export default function rateLimiter(userOptions = {}) {
    const options = Object.assign({
        // window, delay, and max apply per-ip unless global is set to true
        windowMs: config.apps.api.rateLimit ? config.apps.api.rateLimit.windowsMs : false, // milliseconds - how long to keep records of requests in memory
        max: config.apps.api.rateLimit ? config.apps.api.rateLimit.max : 0, // max number of recent connections during `window` miliseconds before sending a 429 response
        message: 'Too many requests, please try again later.',
        statusCode: 429, // 429 status = Too Many Requests (RFC 6585)
    }, userOptions);

    // this is shared by all endpoints that use this instance
    let hits = {};

    const rateLimit = function* rateLimit(next) {
        if (config.apps.api.rateLimit) {
            const ip = this.ip;
            if (hits[ip]) {
                hits[ip]++;
            } else {
                hits[ip] = 1;
            }

            if (hits[ip] > options.max) {
                // rate limit hit
                this.status = options.statusCode;
                this.body = options.message;
                return;
            }
        }

        yield next;
    };

    const resetAll = () => {
        hits = {};
    };

    // simply reset ALL hits every windowMs
    if (options.windowMs) {
        setInterval(resetAll, options.windowMs);
    }

    return rateLimit;
}
