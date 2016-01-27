var loaders = require('./loaders');
var plugins = require('./plugins');
var resolve = require('./resolve');

module.exports = {
    entry: {
        index: [
            __dirname + '/../app/frontend/js/main.js',
            __dirname + '/../app/frontend/css/main.scss',
        ],
    },
    module: {
        loaders: loaders('frontend'),
    },
    output: {
        filename: 'frontend/[name].js',
        path: __dirname + '/../build',
    },
    plugins: plugins('frontend'),
    resolve: resolve('frontend'),
};
