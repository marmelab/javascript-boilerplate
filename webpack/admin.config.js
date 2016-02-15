import loaders from './loaders';
import plugins from './plugins';

module.exports = {
    entry: {
        index: [
            __dirname + '/../src/admin/js/main.js',
            __dirname + '/../src/admin/css/main.scss',
        ],
        login: [
            __dirname + '/../src/admin/js/login.js',
            __dirname + '/../src/admin/css/login.scss',
        ],
    },
    module: {
        loaders: loaders('admin'),
    },
    output: {
        filename: 'admin/[name].js',
        path: __dirname + '/../build',
        publicPath: '/',
    },
    plugins: plugins('admin'),
    devServer: {
        historyApiFallback: true,
    },
};
