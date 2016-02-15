var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassOptions = [
    'includePaths[]=./node_modules/compass-mixins/lib/',
].join("\n");

module.exports = function(appName) {
    var loaders = [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // Options to configure babel with
        query: {
            plugins: [
                'transform-runtime',
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
        loader: 'url-loader?limit=10000&name=/${appName}/[hash].[ext]',
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
    }];

    loaders.push({
        loader: ExtractTextPlugin.extract('css!sass?' + sassOptions),
        test: /\.s?css$/,
    });

    return loaders;
};
