module.exports = {
    apps: {
        api: {
            db: {
                host: 'DB_HOST',
                user: 'DB_USER',
                password: 'DB_PASSWORD',
                database: 'DB_NAME',
            },
            logs: {
                app: { Console: { timestamp: true, level: 'info' } },
                http: { Console: { timestamp: true } },
            },
            security: {
                rateLimitOptions: {
                    adapter: 'redis',
                    redis: {
                        // see https://github.com/NodeRedis/node_redis#rediscreateclient for available options
                    },
                },
            },
        },
    },
};
