export default async function (config, DbClientFactory) {
    try {
        const client = new DbClientFactory(config);
        const result = await client.query({ sql: 'SELECT current_schemas(false)' });
        if (result.length <= 0) return false;
    } catch (err) {
        return false;
    }

    return true;
}
