module.exports = {
    api: {
        driver: 'pg',
        database: process.env.DB_DBNAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
    },
};
