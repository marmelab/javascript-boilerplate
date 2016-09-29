const path = require('path');
const resolve = module => require.resolve(path.resolve(__dirname, './node_modules', module));

require('babel-register')({
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
});
