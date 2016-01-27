export default (client, tableName, fields, idFieldName) => {
    const queryAll = `SELECT ${fields.join(', ')} FROM ${tableName}`;
    const queryById = `${queryAll} WHERE ${idFieldName} = $id LIMIT 1`;

    const selectOneById = function* selectOneById(id) {
        if (!id) {
            throw new Error('No id specified for selecting ' + tableName + ' entity.');
        }

        const result = yield client.query_(queryById, {id: id});
        const entity = result.rows[0];

        if (!entity) {
            const err = new Error('not found');
            err.status = 404;
            throw err;
        }

        return entity;
    };

    const selectAll = function* selectAll() {
        return (yield client.query_(queryAll)).rows;
    };

    const countQuery = `SELECT COUNT(${idFieldName}) FROM ${tableName};`;
    const countAll = function* countAll() {
        const results = yield client.query_(countQuery);

        return results.rows[0].count;
    };

    const refresh = function* refresh(entity) {
        return yield selectOneById(entity[idFieldName]);
    };

    return {
        selectOneById,
        selectAll,
        countAll,
        refresh,
    };
};
