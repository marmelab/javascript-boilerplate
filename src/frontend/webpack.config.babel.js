import config from 'config';
import { DefinePlugin, ProvidePlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';

const sassOptions = 'includePaths[]=./node_modules/compass-mixins/lib/';

export default {
    devServer: {
        contentBase: 'build/frontend',
        historyApiFallback: true,
        inline: true,
        noInfo: true,
        quiet: true,
        progress: false,
    },
    devtool: 'cheap-module-inline-source-map',
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
                resolve(__dirname, '../isomorphic'),
            ],
            loader: 'babel',
            // Options to configure babel with
            query: {
                cacheDirectory: true,
                plugins: [
                    ['transform-runtime', {
                        polyfill: false,
                        regenerator: true,
                    }],
                    'add-module-exports',
                ],
                presets: [
                    'es2015',
                    'react',
                    'stage-1',
                ],
            },
        }, {
            test: /\.json$/,
            loader: 'json',
        }, {
            test: /\.jpe?g$|\.gif$|\.png$/,
            loader: 'url?limit=10000&name=/frontend/[hash].[ext]',
        }, {
            test: /\.(otf|svg)(\?.+)?$/,
            loader: 'url?limit=8192',
        }, {
            test: /\.eot(\?\S*)?$/,
            loader: 'url?limit=100000&mimetype=application/vnd.ms-fontobject',
        }, {
            test: /\.woff2(\?\S*)?$/,
            loader: 'url?limit=100000&mimetype=application/font-woff2',
        }, {
            test: /\.woff(\?\S*)?$/,
            loader: 'url?limit=100000&mimetype=application/font-woff',
        }, {
            test: /\.ttf(\?\S*)?$/,
            loader: 'url?limit=100000&mimetype=application/font-ttf',
        }, {
            test: /\.html$/,
            loader: 'html',
        }, {
            loader: ExtractTextPlugin.extract(`css!sass?${sassOptions}`),
            test: /\.s?css$/,
        }],
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, '../../build/frontend'),
        publicPath: '/',
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
        new ExtractTextPlugin('[name].css', {
            allChunks: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve(__dirname, './index.html'),
            hash: true,
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether',
            'window.Tether': 'tether',
        }),
    ],
    resolve: {
        root: resolve(`${__dirname}/..`),
        alias: {
            isomorphic: 'src/isomorphic',
        },
    },
};
