var config = require('config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = function(appName) {
    appName = appName ? appName += '/' : ''; // eslint-disable-line no-param-reassign

    return [
        new webpack.DefinePlugin({
            'ADMIN_API_URL': JSON.stringify(config.admin.api_url),
            'API_URL': JSON.stringify(config.frontend.api_url),
            'FRONTEND__APP__ENABLE_DEV_TOOLS': JSON.stringify(config.frontend.enableDevTools),
        }),
        new ExtractTextPlugin(appName + '[name].css', {
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: appName + 'index.html',
            template: __dirname + '/../app/' + appName + 'index.html',
        }),
    ];
};
