var loaders = require('./loaders');
var plugins = require('./plugins');
var resolve = require('./resolve');
var sources = require('./sources');

module.exports = {
    entry: {
        main: sources([
        __dirname + '/../frontend/web/js/main.js',
        __dirname + '/../frontend/web/css/main.css',
    ]),
    },
    module: {
        loaders: loaders('web'),
    },
    output: {
        filename: 'web/[name].js',
        path: __dirname + '/../build',
    },
    plugins: plugins('web'),
    resolve: resolve('mobile'),
};
