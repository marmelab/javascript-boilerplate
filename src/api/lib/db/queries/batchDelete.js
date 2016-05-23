export default (client, table, fields, idFieldName) =>
    function* batchInsert(ids) {
        let idsToInsert = ids;

        if (!Array.isArray(ids)) {
            idsToInsert = [ids];
        }

        const idsQuery = idsToInsert.reduce((query, id, index) => {
            const fieldName = idFieldName + index;
            const parameters = {};
            parameters[fieldName] = id;

            return ({
                ...query,
                parameters: {
                    ...query.parameters,
                    ...parameters,
                },
                sql: [...query.sql, `$${fieldName}`],
            });
        }, {
            parameters: {},
            sql: [],
        });

        const query = `
            DELETE FROM ${table}
            WHERE ${idFieldName} IN (${idsQuery.sql.join(', ')})
            RETURNING ${fields.join(', ')}`;

        return (yield client.query_(query, idsQuery.parameters)).rows;
    };
