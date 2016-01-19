var loaders = require('./loaders');
var plugins = require('./plugins');
var sources = require('./sources');

module.exports = {
    entry: {
        index: sources([
            __dirname + '/../app/admin/js/main.js',
            __dirname + '/../app/admin/css/main.scss',
        ]),
        login: sources([
            __dirname + '/../app/admin/js/login.js',
            __dirname + '/../app/admin/css/login.scss',
        ]),
    },
    module: {
        loaders: loaders('admin'),
    },
    output: {
        filename: 'admin/[name].js',
        path: __dirname + '/../build',
    },
    plugins: plugins('admin'),
};
