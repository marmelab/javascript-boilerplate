var apiPort = process.env.NODE_PORT || 3000; // eslint-disable-line no-var
var apiUrl = 'http://localhost:' + apiPort; // eslint-disable-line no-var
var frontendUrl = 'http://localhost:8080'; // eslint-disable-line no-var

module.exports = {
    appName: 'New App',
    apps: {
        admin: {
            api_url: apiUrl + '/admin/',
        },
        api: {
            allowOrigin: [frontendUrl],
            db: {
                driver: 'pg',
                host: 'DB_HOST',
                port: 5432,
                user: 'DB_USER',
                password: 'DB_PASSWORD',
                database: 'DB_NAME',
            },
            logs: {
                app: {Console: { timestamp: true, colorize: true, level: 'error' }},
                http: {},
            },
            cookies: {
                secure: false,
                secureProxy: false,
                httpOnly: false,
                signed: false,
                overwrite: true,
            },
            port: apiPort,
            security: {
                expirationTokenDelay: 1800, // in seconds
                bcrypt: {
                    salt_work_factor: 10, // higher is safer, but slower
                },
                jwt: {
                    privateKey: 'MY-VERY-PRIVATE-KEY',
                },
                secret: 'MY-VERY-SECRET-CRYPTO-KEY-DIFFERENT-FROM-JWT',
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
                rateLimitOptions: {},
            },
        },
        frontend: {
            api_url: apiUrl + '/api',
            enableDevTools: true,
            history: 'createBrowserHistory',
        },
    },
    babel_ignore: /node_modules\/(?!admin-config|fakerest)/,
};
