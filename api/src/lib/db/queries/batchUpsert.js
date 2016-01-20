import batchInsert from './batchInsert';

export default (client, table, primaryFields, secondaryFields, autoIncrementField) => {
    const fields = primaryFields.concat(secondaryFields);
    const tempTable = `temp_${table}_${client.id}`;
    const tempBatchInsert = batchInsert(client, tempTable, fields, null, true, null, true);
    const insertFields = fields.filter(f => f !== autoIncrementField);

    return function* batchUpsert(entities) {
        let error = null;

        try {
            // copy the table structure without the constraint
            yield client.query_(`CREATE TEMPORARY TABLE ${tempTable} AS SELECT * FROM ${table} WHERE true = false;`);
            yield tempBatchInsert(entities);

            const setQuery = secondaryFields.map(f => `${f}=${tempTable}.${f}`);

            const whereUpdateQuery = primaryFields
                .map(field => `${table}.${field}=${tempTable}.${field}`)
                .join(' AND ');

            const whereInsertQuery = primaryFields
                .map(field => `upd.${field}=${tempTable}.${field}`)
                .join(' AND ');

            const query = `
            WITH upd AS (
                UPDATE ${table} SET ${setQuery.join(',')}
                FROM ${tempTable}
                WHERE ${whereUpdateQuery}
                RETURNING ${table}.*
            )
            INSERT INTO ${table} (${insertFields.join(', ')})
            SELECT ${insertFields.join(', ')}
            FROM ${tempTable}
            WHERE NOT EXISTS (
                SELECT 1 FROM upd WHERE ${whereInsertQuery}
            )`;
            yield client.query_(query);
        } catch (e) {
            error = e;
        }

        yield client.query_(`DROP TABLE ${tempTable}`);

        if (error) {
            throw error;
        }
    };
};
