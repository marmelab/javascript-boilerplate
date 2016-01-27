var loaders = require('./loaders');
var plugins = require('./plugins');

module.exports = {
    entry: {
        index: [
            __dirname + '/../app/admin/js/main.js',
            __dirname + '/../app/admin/css/main.scss',
        ],
        login: [
            __dirname + '/../app/admin/js/login.js',
            __dirname + '/../app/admin/css/login.scss',
        ],
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
