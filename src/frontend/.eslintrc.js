module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "mocha": true,
        "node": true,
    },
    "extends": "airbnb",
    plugins: [
        'graphql'
    ],
    "rules": {
        "graphql/template-strings": ['error', { env: 'apollo', schemaJson: require('../schema.json') }],
        "indent": ["error", 4],
        "import/no-extraneous-dependencies": "off",
        "max-len": ["error", {"code": 120, "tabWidth": 4, "ignoreUrls": true}],
        "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4]
    },
};
