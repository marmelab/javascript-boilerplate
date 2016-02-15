var apiUrl = 'http://localhost:3010'; // eslint-disable-line no-var
var frontendUrl = 'http://localhost:8081'; // eslint-disable-line no-var

module.exports = {
    apps: {
        admin: {
            api_url: apiUrl + '/admin/',
        },
        api: {
            allowOrigin: [frontendUrl],
            db: {
                host: 'localhost',
                user: 'postgres',
                password: '',
                database: 'travis_ci_test',
            },
            security: {
                rateLimitOptions: {
                    max: 99,
                },
                xdomain: {
                    master: {
                        base_url: frontendUrl,
                    },
                },
            },
        },
        frontend: {
            api_url: apiUrl + '/api',
            history: 'createHashHistory',
        },
    },
};
