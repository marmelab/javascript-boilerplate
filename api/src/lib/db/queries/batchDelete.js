export default (client, table, fields, idFieldName) => {
    return function* batchInsert(ids) {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }

        const idsQuery = ids.reduce((query, id, index) => {
            const fieldName = idFieldName + index;
            query.parameters[fieldName] = id;
            query.sql.push(`$${fieldName}`);

            return query;
        }, {
            parameters: {},
            sql: [],
        });
        const query = `DELETE FROM ${table} WHERE ${idFieldName} IN (${idsQuery.sql.join(', ')}) RETURNING ${fields.join(', ')}`;

        return (yield client.query_(query, idsQuery.parameters)).rows;
    };
};
