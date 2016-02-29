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
            cookies: {
                secure: false,
                secureProxy: false,
                httpOnly: false,
                signed: false,
                overwrite: true,
            },
            db: {
                driver: 'pg',
                host: 'DB_HOST',
                port: 5432,
                user: 'DB_USER',
                password: 'DB_PASSWORD',
                database: 'DB_NAME',
            },
            healthcare: {
                // internetUrl: 'http://google.com',
                apiUrl: apiUrl + '/api/products',
            },
            logs: {
                app: {Console: { timestamp: true, colorize: true, level: 'error' }},
                http: {},
            },
            port: apiPort,
            security: {
                bcrypt: {
                    salt_work_factor: 10, // higher is safer, but slower
                },
                expirationTokenDelay: 1800, // in seconds
                jwt: {
                    privateKey: 'MY-VERY-PRIVATE-KEY',
                },
                rateLimitOptions: {},
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
