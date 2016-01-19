export default (client, tableName, fields, idFieldName, version) => {
    return function* removeOne(id) {
        if (!id) {
            throw new Error(`No id specified for deleting ${tableName} entity.`);
        }

        if (version) {
            yield version({ id: id }, 'delete', true);
        }

        const query = `DELETE FROM ${tableName} WHERE ${idFieldName} = $id RETURNING ${fields.join(', ')}`;
        const entity = (yield client.query_(query, { id: id })).rows[0];

        if (!entity) {
            throw new Error('not found');
        }

        return entity;
    };
};
