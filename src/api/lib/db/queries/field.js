export default ({
    getFieldNames: (fieldMap) => {
        return Object
            .keys(fieldMap)
            .reduce(
                (fields, table) => {
                    if (table === 'composite') {
                        return fields.concat(fieldMap[table].map(f => f.replace(/^.*AS\s+/, '')));
                    }
                    return fields.concat(fieldMap[table]);
                },
                []
            );
    },
    getFullFieldNames: (fieldMap) => {
        return Object
            .keys(fieldMap)
            .reduce(
                (fields, table) => {
                    if (table === 'composite') {
                        return fields.concat(fieldMap[table]);
                    }
                    return fields.concat(fieldMap[table].map(f => `${table}.${f} AS ${f}`));
                },
                []
            );
    },
});
