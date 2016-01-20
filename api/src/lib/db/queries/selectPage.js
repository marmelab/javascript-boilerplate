export default (client, tableName, exposedFields, searchableFields, sortableFields, idOptions = {}, extraOptions = {}) => {
    const idFieldName = idOptions.name || 'id';
    const exposedFieldsString = exposedFields.join(', ');

    const specificSorts = extraOptions.specificSorts;
    const withQuery = extraOptions.withQuery || tableName.indexOf('JOIN') !== -1;

    let baseQuery = `SELECT ${exposedFieldsString}, COUNT(*) OVER() as totalCount FROM ${tableName}`;
    if (withQuery) {
        // withQuery add a temporary result table that allow to filter on computed and joined field
        baseQuery = `WITH result AS (${baseQuery}) SELECT *, COUNT(*) OVER() as totalCount FROM result`;
    }

    searchableFields = searchableFields || exposedFields;
    sortableFields = sortableFields || exposedFields;

    return function* selectPage(limit, offset, match, sort, sortDir, other) {
        let query = baseQuery;
        const params = {};
        const whereParts = [];

        // handle filter param
        if (match && searchableFields.length > 0) {
            const whereFilerParts = [];
            match = '%' + match + '%';
            params.match = match;
            searchableFields.forEach(f => whereFilerParts.push(`${f}::text ILIKE $match`));
            whereParts.push(`(${whereFilerParts.join(' OR ')})`);
        }

        // handle other param
        if (other) {
            Object.keys(other).forEach(field => {
                if (field.indexOf('from_') === 0 && searchableFields.indexOf(field.substr(5)) !== -1) {
                    whereParts.push(`${field.substr(5)}::timestamp >= $${field}::timestamp`);
                    params[field] = other[field];
                    return;
                }

                if (field.indexOf('to_') === 0 && searchableFields.indexOf(field.substr(3)) !== -1) {
                    whereParts.push(field.substr(3) + '::timestamp <= $' + field + '::timestamp');
                    whereParts.push(`${field.substr(3)}::timestamp <= $${field}::timestamp`);
                    params[field] = other[field];
                    return;
                }

                if (other[field] === 'IS_NULL') {
                    whereParts.push(`${field} IS NULL`);
                    return;
                }

                if (other[field] === 'IS_NOT_NULL') {
                    whereParts.push(`${field} IS NOT NULL`);
                    return;
                }

                if (searchableFields.indexOf(field) !== -1) {
                    let fieldPlaceholder = `$${field}`;
                    if (Array.isArray(other[field])) {
                        fieldPlaceholder = `ANY($${field})`;
                    }

                    whereParts.push(`${field} = ${fieldPlaceholder}`);
                    params[field] = other[field];
                }
            });
        }

        if (whereParts.length > 0) {
            query += ` WHERE ${whereParts.join(' AND ')}`;
        }

        // always sort by id to avoid randomness in case of identical sortField value
        const sortQuery = [`${idFieldName} ASC`];
        if (sort) {
            sort = sort.toLowerCase();
            if (specificSorts && specificSorts.hasOwnProperty(sort)) {
                const specificSort = specificSorts[sort].reduce(
                    (result, condition, index) => `${result} WHEN '${condition}' THEN ${index + 1}`,
                    `CASE ${sort}`
                );
                sortQuery.unshift(`${specificSort} END ${sortDir.toLowerCase() === 'asc' ? ' ASC' : ' DESC'}`);
            } else if (sortableFields.indexOf(sort) !== -1) {
                sortQuery.unshift(sort + (sortDir.toLowerCase() === 'asc' ? ' ASC' : ' DESC'));
            }
        }
        query += ` ORDER BY ${sortQuery.join(', ')}`;

        if (limit) {
            query += ' LIMIT $limit OFFSET $offset';
            params.limit = limit || 30;
            params.offset = offset || 0;
        }

        return (yield client.query_(query, params)).rows;
    };
};
