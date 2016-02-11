module.exports = {
    logs: {
        app: {
            Console: { timestamp: true, colorize: true, level: 'info' },
        },
        http: {
            Console: { timestamp: true, colorize: true }
        },
    },
    db: {
        host: 'DB_HOST',
        user: 'DB_USER',
        password: 'DB_PASSWORD',
        database: 'DB_NAME',
    },
}
