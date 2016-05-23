export default (client, tableName, idFieldName) =>
    function* exists(entityId) {
        const result = yield client.query_(`
            SELECT EXISTS(
                SELECT 1
                FROM ${tableName}
                WHERE ${idFieldName} = $entityId
            )`, { entityId });

        return result.rows[0].exists;
    };
