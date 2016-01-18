export default class Query {
    constructor(model) {
        this.model = model;
        this.client = model.dbClient;
    }

    _buildWhereCond(values) {
        return Object
            .keys(values)
            .map(field => `${field} = '${values[field]}'`)
            .join(' AND ');
    }

    find({selectedFields = '*', ...values}) {
        const q = `SELECT ${selectedFields}
        FROM ${this.model.dbName}
        WHERE ${this._buildWhereCond(values)}`;

        return this.client.query(q);
    }
}
