module.exports = {
    apps: {
        api: {
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
            },
            rateLimit: false,
        },
        frontend: {
            history: 'createHashHistory',
        },
    },
};
