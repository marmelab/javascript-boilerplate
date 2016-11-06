const apiPort = process.env.NODE_PORT || 3000; // eslint-disable-line no-var
const apiUrl = `http://localhost:${apiPort}`; // eslint-disable-line no-var
const adminUrl = 'http://localhost:8081'; // eslint-disable-line no-var
const frontendUrl = 'http://localhost:8080'; // eslint-disable-line no-var

const allowedOrigins = [adminUrl, apiUrl, frontendUrl];

module.exports = {
    appName: 'New App',
    apps: {
        admin: {
            api_url: `${apiUrl}/admin`,
        },
        api: {
            allowedOrigins,
            db: {
                driver: 'pg',
                host: 'DB_HOST',
                port: 5432,
                user: 'DB_USER',
                password: 'DB_PASSWORD',
                database: 'DB_NAME',
            },
            healthcare: {
                internetUrl: 'http://google.com',
                apiUrl,
                endPoint: '/api/products',
            },
            logs: {
                app: { Console: { timestamp: true, colorize: true, level: 'error' } },
                http: {},
            },
            mails: {
                defaultOptions: {
                    emitter: { name: 'marmelab', address: 'info@marmelab.com' },
                },
                transporter: {
                    transport: 'console',
                    transport_options: {},
                },
            },
            port: apiPort,
            security: {
                bcrypt: {
                    salt_work_factor: 10, // higher is safer, but slower
                },
                cookies: {
                    secure: false,
                    secureProxy: false,
                    httpOnly: false,
                    signed: false,
                    overwrite: true,
                },
                expirationTokenDelay: 1800, // in seconds
                jwt: {
                    privateKey: 'MY-VERY-PRIVATE-KEY',
                },
                rateLimitOptions: {
                    auth: {
                        adapter: 'null',
                        duration: 60000,
                        max: 5,
                    },
                    api: {
                        adapter: 'null',
                        duration: 3600000,
                        max: 2500,
                    },
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
            },
        },
        frontend: {
            api_url: `${apiUrl}/api`,
        },
    },
};
