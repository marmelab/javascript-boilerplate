export default function* (config, dbClientFactory) {
    let pgConnection;

    try {
        pgConnection = yield dbClientFactory(config);
        const client = pgConnection.client;
        const result = yield client.query_('SELECT current_schemas(false)');

        if (result.rows.length <= 0) return false;
    } catch (err) {
        return false;
    }

    return true;
}
