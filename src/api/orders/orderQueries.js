import { crudQueries, selectPageQuery } from 'co-postgres-queries';

const tableName = 'user_order';

const exposedFields = [
    'id',
    'reference',
    'date',
    'customer_id',
    'total',
    'status',
];

const orderQueries = crudQueries(tableName, exposedFields, ['id'], exposedFields);

const selectByUserId = selectPageQuery(tableName, ['customer_id'], exposedFields);

export default Object.assign({
    selectByUserId,
}, orderQueries);
