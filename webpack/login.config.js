var loaders = require('./loaders');
var plugins = require('./plugins');
var sources = require('./sources');

module.exports = {
    entry: {
        login: sources([
            __dirname + '/../frontend/login.js',
            'bootstrap/dist/css/bootstrap.css',
        ]),
    },
    module: {
        loaders: loaders(),
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/../build',
    },
    plugins: plugins(),
};
