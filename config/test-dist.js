const adminUrl = 'http://localhost:9081';
const apiUrl = 'http://localhost:3010';
const frontendUrl = 'http://localhost:9080';
const allowedOrigins = [
    adminUrl,
    apiUrl,
    frontendUrl,
];

module.exports = {
    apps: {
        admin: {
            api_url: `${apiUrl}/admin/`,
        },
        api: {
            allowedOrigins,
            db: {
                database: 'travis_ci_test',
                host: 'localhost',
                password: '',
                user: 'postgres',
            },
            security: {
                xdomain: {
                    master: {
                        base_url: frontendUrl,
                    },
                },
            },
        },
        frontend: {
            api_url: `${apiUrl}/api`,
        },
    },
};
