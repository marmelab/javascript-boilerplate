module.exports = {
    "parser": "babel-eslint",
    "env": {
        "mocha": true,
        "node": true,
    },
    "extends": "airbnb-base",
    plugins: [
        'graphql'
    ],
    "rules": {
        "graphql/template-strings": ['error', { env: 'apollo', schemaJson: require('../schema.json') }],
        "indent": ["error", 4],
        "import/no-extraneous-dependencies": "off",
        "max-len": ["error", {"code": 120, "tabWidth": 4, "ignoreUrls": true}]
    },
};
