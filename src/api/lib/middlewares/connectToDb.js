/* eslint no-param-reassign: off */
export default (dbClient, appLogger, config) => async (ctx, next) => {
    let pgConnection;
    let error;

    try {
        pgConnection = await dbClient(config);
        ctx.client = pgConnection.client;
    } catch (err) {
        appLogger.log('error', `Unable to connect to database: ${err.message}`, { err });
        ctx.throw(503, 'Unable to connect to database');
    }

    try {
        await next();
    } catch (err) {
        // Since there was an error somewhere down the middleware,
        // then we need to throw this client away.
        error = err;

        throw err;
    } finally {
        appLogger.log('debug', 'Closing DB connection');
        pgConnection.done(error);
    }
};
