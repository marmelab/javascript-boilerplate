import { crudQueries, selectPageQuery } from 'co-postgres-queries';

const tableName = 'user_order';

const fields = [
    'reference',
    'date',
    'customer_id',
    'total',
    'status',
];

const exposedFields = ['id'].concat(fields);

const orderQueries = crudQueries(tableName, fields, ['id'], exposedFields);

const selectByUserId = selectPageQuery(tableName, ['customer_id'], exposedFields);

export default Object.assign({
    selectByUserId,
}, orderQueries);
