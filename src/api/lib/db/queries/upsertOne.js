export default (
    client,
    table,
    primaryFields,
    secondaryFields,
    autoIncrementField,
    returningFields = secondaryFields
) => {
    const fields = primaryFields.concat(secondaryFields);
    const insertFields = fields.filter(f => f !== autoIncrementField);

    return function* upsertOne(entity) {
        const setQuery = secondaryFields.map(field => `${field}=$${field}`);
        const sanitizedEntity = Object.assign({}, entity);

        if (autoIncrementField) {
            sanitizedEntity[autoIncrementField] = entity[autoIncrementField] || null;
        }

        const valuesQuery = Object
            .keys(sanitizedEntity)
            .filter(key => key !== autoIncrementField)
            .map(key => `$${key}`);

        const whereQuery = primaryFields
            .map(field => `${table}.${field}=$${field}`)
            .join(' AND ');

        const query = `WITH upsert AS (
            UPDATE ${table}
            SET ${setQuery.join(',')}
            WHERE ${whereQuery}
            RETURNING ${table}.*
        )
        INSERT INTO ${table} (${insertFields.join(', ')})
        SELECT ${valuesQuery.join(', ')}
        WHERE NOT EXISTS (
            SELECT * FROM upsert
        )`;

        yield client.query_(query, sanitizedEntity);

        return yield client.query_(`
            SELECT ${returningFields.join(', ')}
            FROM ${table}
            WHERE ${whereQuery}`, sanitizedEntity);
    };
};
