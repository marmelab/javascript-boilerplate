import pg from 'pg';
import coPg from 'co-pg';
import named from 'node-postgres-named';

export default function* dbClient({host, port, user, password, database}) {
    const postgresql = coPg(pg);
    const connection = `postgres://${user}:${password}@${host}:${port}/${database}`;
    const connectionResponse = yield postgresql.connect_(connection);
    const client = connectionResponse[0];
    const done = connectionResponse[1];

    named.patch(client);
    const query = client.query;

    client.query_ = (queryString, values) => {
        return callback => query(queryString, values, callback);
    };

    client.id = (yield client.query_('SELECT pg_backend_pid()')).rows[0].pg_backend_pid;

    return {
        client,
        done,
    };
}
