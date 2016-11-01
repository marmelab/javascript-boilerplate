import config from 'config';
import { DefinePlugin, LoaderOptionsPlugin, ProvidePlugin, SourceMapDevToolPlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';

export default {
    devServer: {
        contentBase: 'build/frontend',
        historyApiFallback: true,
        inline: true,
        noInfo: true,
        quiet: true,
        progress: false,
    },
    entry: {
        index: [
            resolve(__dirname, './js/main.js'),
            resolve(__dirname, './css/main.scss'),
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
                babelrc: false,
                cacheDirectory: true,
                presets: [
                    ['es2015', { loose: true, modules: false }],
                    'react',
                    'stage-1',
                ].concat(process.env.NODE_ENV === 'development' ? ['react-hmre'] : []),
                plugins: [
                    ['transform-runtime', {
                        polyfill: false,
                        regenerator: true,
                    }],
                ],
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
            test: /\.s?css$/,
            loader: ExtractTextPlugin.extract({
                loader: [
                    'css',
                    'sass',
                ],
            }),
        }],
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, '../../build/frontend'),
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
        new ExtractTextPlugin({
            allChunks: false,
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve(__dirname, './index.html'),
            hash: true,
        }),
        new LoaderOptionsPlugin({
            options: {
                context: __dirname,
                minimize: process.env.NODE_ENV !== 'development',
                sassLoader: {
                    includePaths: ['./node_modules/compass-mixins/lib/'],
                },
            },
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether',
            'window.Tether': 'tether',
        }),
    ].concat(process.env.NODE_ENV === 'development' ? [
        new SourceMapDevToolPlugin({ filename: '[file].map' }),
    ] : []),
};
