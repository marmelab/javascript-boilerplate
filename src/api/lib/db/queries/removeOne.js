export default (client, tableName, fields, idFieldName, version) =>
    function* removeOne(id) {
        if (!id) {
            throw new Error(`No id specified for deleting ${tableName} entity.`);
        }

        if (version) {
            yield version({ id }, 'delete', true);
        }

        const query = `
            DELETE FROM ${tableName}
            WHERE ${idFieldName} = $id
            RETURNING ${fields.join(', ')}`;

        const entity = (yield client.query_(query, { id })).rows[0];

        if (!entity) {
            throw new Error('not found');
        }

        return entity;
    };
