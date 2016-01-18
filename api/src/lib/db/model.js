import manager from './manager';
import validators from './validators';

/**
 * Usage:
 *  const myModel = new Model(dbClient 'mymodel');
 *  myModel.fields = ['field1', 'field2'];
 *  const createdInstance = myModel.manager.create({field1: 'value', field2: 'value'});
 *  const foundInstance = myModel.manager.find({id: 42});
 *  myModel.manager.delete({id: 42});
 */
export default (dbClient, dbName, fields = [], primaryKey = 'id') => {
    const model = {
        dbClient,
        dbName,
        primaryKey,
        fields,
        allFields: [primaryKey, ...fields],
    };

    return {
        ...model,
        manager: manager(model),
        validate: (values, quiet = false) => {
            return [
                validators.validateAllFieldsInModel(model, values, quiet),
            ].every(v => v === true);
        },
    };
};
