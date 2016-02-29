import buildCheckResult from './buildCheckResult';

// config.apps.api.healthcare.internetAccessUrl
export default function* (config, dbClientFactory) {
    let pgConnection;

    try {
        pgConnection = yield dbClientFactory(config);
        const client = pgConnection.client;
        const result = yield client.query_('SELECT current_schemas(false)');

        if (result.rows.length <= 0) return buildCheckResult(false, 'Invalid response from database');
    } catch (err) {
        return buildCheckResult(false, 'Unable to connect to database');
    }

    return buildCheckResult();
}
