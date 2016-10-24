import convert from 'koa-convert';
import omit from 'lodash.omit';

export default (userOptions = {}) => {
    const adapter = userOptions.adapter || 'memory';
    let options = omit(userOptions, 'adapter');

    // window, delay, and max apply per-ip unless global is set to true
    options = Object.assign({
        // milliseconds - how long to keep records of requests in memory
        duration: 60 * 1000,
        // max number of recent connections during `window` miliseconds before
        // sending a 429 response
        max: 5,
    }, options);

    const adapterImplementation = require(`./${adapter}`).default; // eslint-disable-line global-require
    return convert(adapterImplementation(options));
};
