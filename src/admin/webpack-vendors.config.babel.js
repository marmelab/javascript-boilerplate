import { resolve } from 'path';
import { DllPlugin, optimize } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const { OccurenceOrderPlugin, UglifyJsPlugin } = optimize;

export default {
    entry: {
        vendor: [resolve(__dirname, './js', 'vendors.js')],
    },
    module: {
        loaders: [{
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
            loader: ExtractTextPlugin.extract('css'),
            test: /\.css$/,
        }],
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, '../../build/admin'),
        library: '[name]',
    },
    plugins: [
        new DllPlugin({
            path: resolve(__dirname, './js', '[name]-manifest.json'),
            name: '[name]',
            context: resolve(__dirname, './src'),
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: false,
        }),
        new OccurenceOrderPlugin(),
        new UglifyJsPlugin(),
    ],
};