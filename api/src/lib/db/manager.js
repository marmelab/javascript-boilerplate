import query from './query';

export default model => ({
    create(values) {
        model.validate(values);
        return query(model).create(values);
    },

    find({selectedFields = '*', ...values}) {
        model.validate(values);
        return query(model).find({selectedFields, ...values});
    },

    update(values) {
        model.validate(values);
        return query(model).update(values);
    },

    delete(values) {
        model.validate(values);
        return query(model).delete(values);
    },
});
