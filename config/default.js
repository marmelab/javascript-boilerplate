var frontendUrl = 'http://localhost:8080'; // eslint-disable-line no-var
var apiPort = process.env.NODE_PORT || 3000; // eslint-disable-line no-var

module.exports = {
    admin: {
        api_url: 'http://localhost:' + apiPort + '/admin/',
    },
    api: {
        maxAge: 600,
        port: apiPort,
    },
    babel_ignore: /node_modules\/(?!admin-config|fakerest)/,
    logs: {
        app: {Console: { timestamp: true, colorize: true, level: 'error' }},
        http: {},
    },
    db: {
        host: 'DB_HOST',
        user: 'DB_USER',
        password: 'DB_PASSWORD',
        name: 'DB_NAME',
    },
    max_event_listeners: 30,
    webpack_source: frontendUrl + '/',
    allowOrigin: [frontendUrl],
    jwt: {
        privateKey: 'MY-VERY-PRIVATE-KEY',
    },
    frontend: {
        api_url: 'http://localhost:' + apiPort + '/api',
        enableDevTools: true,
    },
    security: {
        bcrypt: {
            salt_work_factor: 10, // higher is safer, but slower
        },
    },
};
