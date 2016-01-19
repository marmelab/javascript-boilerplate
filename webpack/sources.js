var config = require('config');

module.exports = function getEntrySources(sources) {
    if (process.env.NODE_ENV === 'development') {
        sources.push('webpack-dev-server/client?' + config.webpack_source);
    }

    return sources;
};
