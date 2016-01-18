var loaders = require('./loaders');
var plugins = require('./plugins');
var resolve = require('./resolve');
var sources = require('./sources');

module.exports = {
    entry: {
        main: sources([
        __dirname + '/../app/mobile/js/main.js',
        __dirname + '/../app/mobile/css/main.css',
    ]),
    },
    module: {
        loaders: loaders('mobile'),
    },
    output: {
        filename: 'mobile/[name].js',
        path: __dirname + '/../build',
    },
    plugins: plugins('mobile'),
    resolve: resolve('mobile'),
};
