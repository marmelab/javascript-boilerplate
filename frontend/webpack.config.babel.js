import config from 'config';
import { DefinePlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const resolve = module => require.resolve(path.resolve(__dirname, './node_modules', module));

const sassOptions = 'includePaths[]=./node_modules/compass-mixins/lib/';

export default {
    cache: true,
    entry: {
        index: [
            `${__dirname}/src/js/main.js`,
            `${__dirname}/src/css/main.scss`,
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
                    resolve('babel-plugin-transform-react-jsx'),
                    [resolve('babel-plugin-transform-runtime'), {
                        polyfill: false,
                        regenerator: true,
                    }],
                    resolve('babel-plugin-add-module-exports'),
                ],
                presets: [
                    'babel-preset-es2015',
                    'babel-preset-react',
                    'babel-preset-stage-0',
                ].map(resolve),
            },
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.jpe?g$|\.gif$|\.png$/,
            loader: 'url-loader?limit=10000&name=/admin/[hash].[ext]',
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
        }, {
            loader: ExtractTextPlugin.extract(`css!sass?${sassOptions}`),
            test: /\.s?css$/,
        }],
    },
    output: {
        filename: '[name].js',
        path: `${__dirname}/../build/frontend`,
        publicPath: '/',
    },
    plugins: [
        new DefinePlugin({
            APP_NAME: JSON.stringify(config.appName),
            API_URL: JSON.stringify(config.apps.frontend.api_url),
            FRONTEND_HISTORY: JSON.stringify(config.apps.frontend.history),
            FRONTEND__APP__ENABLE_DEV_TOOLS: JSON.stringify(config.apps.frontend.enableDevTools),
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${__dirname}/src/index.html`,
            hash: true,
        }),
    ],
    resolve: {
        root: path.resolve(__dirname, '..'),
        modulesDirectories: [path.resolve(__dirname, 'node_modules'), 'node_modules', 'web_modules'],
    },
    devServer: {
        historyApiFallback: true,
    },
};
