import { assert } from 'chai';

export default (select, watchedFields) => {
    return function* hasChange(entity) {
        const old = yield select.selectOneById(entity.id);
        const copy = {};
        const original = {};

        watchedFields.forEach(key => {
            original[key] = old[key];

            // undefined is considered has no change
            copy[key] = typeof entity[key] !== 'undefined' ? entity[key] : original[key];
        });

        try {
            assert.deepEqual(copy, original);
        } catch (e) {
            return true;
        }

        return false;
    };
};
