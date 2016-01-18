var loaders = require('./loaders');
var plugins = require('./plugins');
var sources = require('./sources');

module.exports = {
    entry: {
        main: sources([
            __dirname + '/../frontend/admin/js/main.js',
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
