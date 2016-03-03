export default (userOptions = {}) => {
    let { adapter, ...options } = userOptions;
    adapter = adapter || 'memory';
    options = Object.assign({
        // window, delay, and max apply per-ip unless global is set to true
        duration: 60 * 1000, // milliseconds - how long to keep records of requests in memory
        max: 5, // max number of recent connections during `window` miliseconds before sending a 429 response
    }, options);

    const adapterImplementation = require(`./${adapter}`);

    return adapterImplementation(options);
};
