import Query from './query';

export default class Manager {
    constructor(model) {
        this.model = model;
        this.Query = Query;
    }

    create(values) {
        this.model.validate(values);
        return new this.Query(this.model).create(values);
    }

    find({selectedFields = '*', ...values}) {
        this.model.validate(values);
        return new this.Query(this.model).find({selectedFields, ...values});
    }

    update(values) {
        this.model.validate(values);
        return new this.Query(this.modeel).update(values);
    }

    delete(values) {
        this.model.validate(values);
        return new this.Query(this.model).delete(values);
    }
}
