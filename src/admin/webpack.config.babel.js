import config from 'config';
import { DefinePlugin, LoaderOptionsPlugin, SourceMapDevToolPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';

export default {
    devServer: {
        contentBase: 'build/admin',
        historyApiFallback: true,
        inline: true,
        noInfo: true,
        quiet: true,
        progress: false,
    },
    entry: {
        index: [
            resolve(__dirname, './js/main.js'),
        ],
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [
                resolve(__dirname, './js'),
                resolve(__dirname, '../common'),
            ],
            loader: 'babel',
            // Options to configure babel with
            query: {
                cacheDirectory: true,
            },
        }, {
            test: /\.json$/,
            loader: 'json',
        }, {
            test: /\.jpe?g$|\.gif$|\.png$/,
            loader: 'url',
            query: { limit: 10000, name: '/frontend/[hash].[ext]' },
        }, {
            test: /\.(otf|svg)(\?.+)?$/,
            loader: 'url',
            query: { limit: 8192 },
        }, {
            test: /\.eot(\?\S*)?$/,
            loader: 'url',
            query: { limit: 10000, mimetype: 'application/vnd.ms-fontobject' },
        }, {
            test: /\.woff2(\?\S*)?$/,
            loader: 'url',
            query: { limit: 10000, mimetype: 'application/font-woff2' },
        }, {
            test: /\.woff(\?\S*)?$/,
            loader: 'url',
            query: { limit: 10000, mimetype: 'application/font-woff' },
        }, {
            test: /\.ttf(\?\S*)?$/,
            loader: 'url',
            query: { limit: 10000, mimetype: 'application/font-ttf' },
        }, {
            test: /\.html$/,
            loader: 'html',
        }, {
            test: /\.css$/,
            loader: 'css-loader',
        }],
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, '../../build/admin'),
    },
    plugins: [
        new DefinePlugin({
            APP_NAME: JSON.stringify(config.appName),
            ADMIN_API_URL: JSON.stringify(config.apps.admin.api_url),
            API_URL: JSON.stringify(config.apps.frontend.api_url),
            FRONTEND_HISTORY: JSON.stringify(config.apps.frontend.history),
            FRONTEND__APP__ENABLE_DEV_TOOLS: JSON.stringify(config.apps.frontend.enableDevTools),
            'process.env': {
                NODE_ENV: process.env.NODE_ENV === 'development' ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('production'), // eslint-disable-line max-len
            },
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve(__dirname, './index.html'),
            chunks: ['index'],
            hash: true,
        }),
        new LoaderOptionsPlugin({
            options: {
                context: __dirname,
                minimize: process.env.NODE_ENV !== 'development',
            },
        }),
    ].concat(process.env.NODE_ENV === 'development' ? [
        new SourceMapDevToolPlugin({ filename: '[file].map' }),
    ] : []),
};
