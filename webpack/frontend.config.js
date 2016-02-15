import loaders from './loaders';
import plugins from './plugins';
import resolve from './resolve';

module.exports = {
    entry: {
        index: [
            __dirname + '/../src/frontend/js/main.js',
            __dirname + '/../src/frontend/css/main.scss',
        ],
    },
    module: {
        loaders: loaders('frontend'),
    },
    output: {
        filename: 'frontend/[name].js',
        path: __dirname + '/../build',
        publicPath: '/',
    },
    plugins: plugins('frontend'),
    resolve: resolve('frontend'),
    devServer: {
        historyApiFallback: true,
    },
};
