var config = require('config'); // eslint-disable-line no-var
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line no-var
var HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line no-var
var webpack = require('webpack'); // eslint-disable-line no-var

module.exports = function(appName) {
    return [
        new webpack.DefinePlugin({
            'APP_NAME': JSON.stringify(config.appName),
            'ADMIN_API_URL': JSON.stringify(config.admin.api_url),
            'API_URL': JSON.stringify(config.frontend.api_url),
            'FRONTEND__APP__ENABLE_DEV_TOOLS': JSON.stringify(config.frontend.enableDevTools),
        }),
        new ExtractTextPlugin(appName + '/[name].css', {
            allChunks: false,
        }),
    ].concat(appName === 'admin' ? [new HtmlWebpackPlugin({
        filename: appName + '/' + 'index.html',
        template: __dirname + '/../app/' + appName + '/index.html',
        chunks: ['index'],
        hash: true,
    }), new HtmlWebpackPlugin({
        filename: appName + '/' + 'login.html',
        template: __dirname + '/../app/' + appName + '/login.html',
        chunks: ['login'],
        hash: true,
    })] : [new HtmlWebpackPlugin({
        filename: appName + '/' + 'index.html',
        template: __dirname + '/../app/' + appName + '/index.html',
        hash: true,
    })]);
};
