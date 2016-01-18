const mapFieldValue = values => {
    return Object
        .keys(values)
        .map(field => `${field} = '${values[field]}'`);
};

const buildWhereCond = values => {
    return mapFieldValue(values).join(' AND ');
};

export default model => ({
    create(values) {
        const columns = Object.keys(values);
        const rowData = columns.map(c => `'${values[c]}'`);

        const q = `INSERT INTO ${model.dbName}
        (${columns.join(', ')}) VALUES (${rowData.join(', ')})`;

        return model.client.query(q);
    },

    find({selectedFields = '*', ...values}) {
        const q = `SELECT ${selectedFields}
        FROM ${model.dbName}
        WHERE ${buildWhereCond(values)}`;

        return model.client.query(q);
    },

    update(values) {
        const pk = values[model.primaryKey];
        delete values[model.primaryKey];

        const q = `UPDATE ${model.dbName}
        SET ${mapFieldValue(values).join(', ')}
        WHERE ${model.primaryKey} = ${pk}`;

        return model.client.query(q);
    },

    delete(values) {
        const q = `DELETE FROM ${model.dbName}
        WHERE ${buildWhereCond(values)}`;

        return model.client.query(q);
    },
});
