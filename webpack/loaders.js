var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(appName) {
    var loaders = [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // Options to configure babel with
        query: {
            plugins: ['transform-runtime'],
            presets: [
                require.resolve('babel-preset-es2015'),
                require.resolve('babel-preset-react'),
                require.resolve('babel-preset-stage-0'),
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
    }];

    if (process.env.NODE_ENV !== 'development') {
        loaders.push({
            loader: ExtractTextPlugin.extract('css'),
            test: /\.css$/,
        });
    } else {
        loaders.push({
            loader: 'style!css',
            test: /\.css$/,
        });
        loaders.push({
            loader: 'file?name=' + appName + '/[name].html',
            test: /\.html$/,
            exclude: new RegExp('/node_modules|' + appName + '\/js/'),
        });
    }

    return loaders;
};
