import config from 'config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

export function definePlugin() {
    return new webpack.DefinePlugin({
        APP_NAME: JSON.stringify(config.appName),
        ADMIN_API_URL: JSON.stringify(config.apps.admin.api_url),
        API_URL: JSON.stringify(config.apps.frontend.api_url),
        FRONTEND_HISTORY: JSON.stringify(config.apps.frontend.history),
        FRONTEND__APP__ENABLE_DEV_TOOLS: JSON.stringify(config.apps.frontend.enableDevTools),
    });
}

export function extractTextPlugin(appName) {
    return new ExtractTextPlugin(`${appName}/[name].css`, {
        allChunks: false,
    });
}
