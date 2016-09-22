/* eslint no-param-reassign: off */
export default (connect, appLogger) => async (ctx, next) => {
    try {
        ctx.client = await connect();
    } catch (err) {
        appLogger.log('error', `Unable to connect to database: ${err.message}`, { err });
        ctx.throw(503, 'Unable to connect to database');
    }

    try {
        await next();
    } catch (error) {
        // Since there was an error somewhere down the middleware,
        // then we need to throw this client away.
        ctx.client.end();

        throw error;
    } finally {
        appLogger.log('debug', 'Closing DB connection');
        ctx.client.release();
    }
};
