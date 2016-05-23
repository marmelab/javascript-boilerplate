export default (
    client,
    tableName,
    exposedFields,
    searchableFields = exposedFields,
    sortableFields = exposedFields,
    idOptions = {},
    extraOptions = {}
) => {
    const idFieldName = idOptions.name || 'id';
    const exposedFieldsString = exposedFields.join(', ');

    const specificSorts = extraOptions.specificSorts;
    const withQuery = extraOptions.withQuery || tableName.indexOf('JOIN') !== -1;

    let baseQuery = `
        SELECT ${exposedFieldsString},
        COUNT(*) OVER() as totalCount
        FROM ${tableName}`;

    if (withQuery) {
        // withQuery add a temporary result table that allow to filter on computed and joined field
        baseQuery = `
            WITH result AS (${baseQuery})
            SELECT *, COUNT(*) OVER() as totalCount
            FROM result`;
    }

    return function* selectPage(limit = 30, offset = 0, match, sort, sortDir, other) {
        let query = baseQuery;
        const params = {};
        const whereParts = [];

        // handle filter param
        if (match && searchableFields.length > 0) {
            const whereFilerParts = [];
            params.match = `%${match}%`;
            searchableFields.forEach(f => whereFilerParts.push(`${f}::text ILIKE $match`));
            whereParts.push(`(${whereFilerParts.join(' OR ')})`);
        }

        // handle other param
        if (other) {
            Object.keys(other).forEach(field => {
                if (field.startsWith('from_') && searchableFields.includes(field.substr(5))) {
                    whereParts.push(`${field.substr(5)}::timestamp >= $${field}::timestamp`);
                    params[field] = other[field];
                    return;
                }

                if (field.startsWith('to_') && searchableFields.includes(field.substr(3))) {
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
            const sanitizedSort = sort.toLowerCase();
            const finalSortDir = sortDir.toLowerCase() === 'asc' ? ' ASC' : ' DESC';

            if (specificSorts && specificSorts.hasOwnProperty(sanitizedSort)) {
                const specificSort = specificSorts[sanitizedSort].reduce(
                    (result, condition, index) => `${result} WHEN '${condition}' THEN ${index + 1}`,
                    `CASE ${sanitizedSort}`
                );
                sortQuery.unshift(`${specificSort} END ${finalSortDir}`);
            } else if (sortableFields.indexOf(sanitizedSort) !== -1) {
                sortQuery.unshift(sanitizedSort + finalSortDir);
            }
        }
        query += ` ORDER BY ${sortQuery.join(', ')}`;

        query += ' LIMIT $limit OFFSET $offset';
        params.limit = limit;
        params.offset = offset;

        return (yield client.query_(query, params)).rows;
    };
};
