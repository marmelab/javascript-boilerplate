var apiPort = process.env.NODE_PORT || 3000; // eslint-disable-line no-var
var apiUrl = 'http://localhost:' + apiPort; // eslint-disable-line no-var
var frontendUrl = 'http://localhost:8080'; // eslint-disable-line no-var

module.exports = {
    appName: 'New App',
    admin: {
        api_url: apiUrl + '/admin/',
    },
    api: {
        maxAge: 600,
        port: apiPort,
        allowOrigin: [frontendUrl],
    },
    babel_ignore: /node_modules\/(?!admin-config|fakerest)/,
    logs: {
        app: {Console: { timestamp: true, colorize: true, level: 'error' }},
        http: {},
    },
    db: {
        driver: 'pg',
        host: 'DB_HOST',
        port: 5432,
        user: 'DB_USER',
        password: 'DB_PASSWORD',
        database: 'DB_NAME',
    },
    max_event_listeners: 30,
    webpack_source: frontendUrl + '/',
    jwt: {
        privateKey: 'MY-VERY-PRIVATE-KEY',
    },
    frontend: {
        api_url: apiUrl + '/api',
        enableDevTools: true,
    },
    security: {
        bcrypt: {
            salt_work_factor: 10, // higher is safer, but slower
        },
        xdomain: {
            master: {
                base_url: frontendUrl,
            },
            slave: {
                base_url: apiUrl,
                debug: true,
                path: '/xdomain',
            },
        },
    },
};
