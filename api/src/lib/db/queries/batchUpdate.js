import batchInsert from './batchInsert';

export default (client, table, fields, idFieldName) => {
    const tempTable = `temp_${table}_${client.id}`;
    const tempBatchInsert = batchInsert(client, tempTable, fields, idFieldName, false, null, true);

    return function* batchUpdate(entities) {
        // copy the table structure without the constraint
        yield client.query_(`CREATE TEMPORARY TABLE ${tempTable} AS SELECT * FROM ${table} WHERE true = false;`);

        yield tempBatchInsert(entities);

        const setQuery = fields.map(field => `${field}=${tempTable}.${field}`);
        const query = `UPDATE ${table} SET ${setQuery.join(', ')} FROM ${tempTable}
        WHERE ${table}.${idFieldName} = ${tempTable}.${idFieldName}
        RETURNING ${fields.map(f => table + '.' + f).join(',')}`;

        let error;
        try {
            entities = (yield client.query_(query)).rows;
        } catch (e) {
            error = e;
        }
        yield client.query_('DROP TABLE ' + tempTable);

        if (error) {
            throw error;
        }

        return entities;
    };
};
