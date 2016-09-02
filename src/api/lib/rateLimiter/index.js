export default (userOptions = {}) => {
    let { adapter } = userOptions;
    adapter = adapter || 'memory';

    // window, delay, and max apply per-ip unless global is set to true
    const options = Object.assign({
        // milliseconds - how long to keep records of requests in memory
        duration: 60 * 1000,
        // max number of recent connections during `window` miliseconds before
        // sending a 429 response
        max: 5,
    }, userOptions, { adapter: undefined });

    const adapterImplementation = require(`./${adapter}`).default; // eslint-disable-line global-require, max-len
    return adapterImplementation(options);
};
