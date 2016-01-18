import pg from 'pg';

export default ({host, user, pswd, name}) => {
    const connection = `postgres://${user}:${pswd}@${host}/${name}`;
    return new pg.Client(connection);
};
