import config from 'config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default function (appName) {
    return [
        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(config.appName),
            ADMIN_API_URL: JSON.stringify(config.apps.admin.api_url),
            API_URL: JSON.stringify(config.apps.frontend.api_url),
            FRONTEND_HISTORY: JSON.stringify(config.apps.frontend.history),
            FRONTEND__APP__ENABLE_DEV_TOOLS: JSON.stringify(config.apps.frontend.enableDevTools),
        }),
        new ExtractTextPlugin(`${appName}/[name].css`, {
            allChunks: false,
        }),
    ].concat(appName === 'admin' ? [
        new HtmlWebpackPlugin({
            filename: `${appName}/index.html`,
            template: `${__dirname}/../src/${appName}/index.html`,
            chunks: ['index'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: `${appName}/login.html`,
            template: `${__dirname}/../src/${appName}/login.html`,
            chunks: ['login'],
            hash: true,
        }),
    ] : [
        new HtmlWebpackPlugin({
            filename: `${appName}/index.html`,
            template: `${__dirname}/../src/${appName}/index.html`,
            hash: true,
        }),
    ]);
}
