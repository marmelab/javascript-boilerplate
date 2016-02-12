module.exports = {
    apps: {
        api: {
            db: {
                host: 'localhost',
                user: 'postgres',
                password: undefined,
                database: 'boilerplate',
            },
        },
        frontend: {
            history: 'createHashHistory',
        },
    },
    logs: {
        app: {
            Console: { timestamp: true, colorize: true, level: 'info' },
        },
        http: {
            Console: { timestamp: true, colorize: true },
        },
    },
};
