const apiUrl = 'http://localhost:3010';
const allowUrls = ['http://localhost:8081', `${apiUrl}/api`];

module.exports = {
    apps: {
        admin: {
            api_url: `${apiUrl}/admin/`,
        },
        api: {
            allowOrigin: allowUrls,
            db: {
                database: 'travis_ci_test',
                host: 'localhost',
                password: '',
                user: 'postgres',
            },
            security: {
                xdomain: {
                    master: {
                        base_url: allowUrls[0],
                    },
                },
            },
        },
        frontend: {
            api_url: `${apiUrl}/api`,
        },
    },
};
