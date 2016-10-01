import config from 'config';
import { DefinePlugin, DllReferencePlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
    entry: {
        index: [
            path.resolve(__dirname, './js/main.js'),
        ],
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            // Options to configure babel with
            query: {
                cacheDirectory: true,
                plugins: [
                    'transform-react-jsx',
                    ['transform-runtime', {
                        polyfill: false,
                        regenerator: true,
                    }],
                    'add-module-exports',
                ],
                presets: [
                    'es2015',
                    'react',
                    'stage-0',
                ],
            },
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.jpe?g$|\.gif$|\.png$/,
            loader: 'url-loader?limit=10000&name=/frontend/[hash].[ext]',
        }, {
            test: /\.(otf|svg)(\?.+)?$/,
            loader: 'url-loader?limit=8192',
        }, {
            test: /\.eot(\?\S*)?$/,
            loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject',
        }, {
            test: /\.woff2(\?\S*)?$/,
            loader: 'url-loader?limit=100000&mimetype=application/font-woff2',
        }, {
            test: /\.woff(\?\S*)?$/,
            loader: 'url-loader?limit=100000&mimetype=application/font-woff',
        }, {
            test: /\.ttf(\?\S*)?$/,
            loader: 'url-loader?limit=100000&mimetype=application/font-ttf',
        }, {
            test: /\.html$/,
            loader: 'html',
        }],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../build/admin'),
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
        new DllReferencePlugin({
            context: path.resolve(__dirname, '../../build/admin/js'),
            manifest: require(path.resolve(__dirname, './js', './vendor-manifest.json')), // eslint-disable-line global-require, max-len, import/no-dynamic-require
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './index.html'),
            chunks: ['index'],
            hash: true,
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
};
