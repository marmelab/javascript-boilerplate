import { ValidationError } from './error';
import Manager from './manager';

/**
 * Usage:
 *  const myModel = new Model(dbClient 'mymodel');
 *  myModel.fields = ['field1', 'field2'];
 *  const createdInstance = myModel.manager.create({field1: 'value', field2: 'value'});
 *  const foundInstance = myModel.manager.find({id: 42});
 *  myModel.manager.delete({id: 42});
 */
export default class Model {
    constructor(dbClient, dbName, fields = []) {
        this.dbClient = dbClient;
        this.dbName = dbName;
        this.primaryKey = 'id';
        this.fields = fields;

        this.manager = new Manager(this);
    }

    allFields() {
        return [this.primaryKey, ...this.fields];
    }

    validateAllFieldsInModel(values, quiet = false) {
        const fields = Object
                        .keys(values)
                        .filter(field => this.allFields().indexOf(field) === -1);

        if (fields.length > 0) {
            if (!quiet) {
                throw new ValidationError(`Fields "${fields.join(', ')}" are not in model.
                Availables fields are: ${this.allFields().join(', ')}`);
            }

            return false;
        }

        return true;
    }

    validate(values, quiet = false) {
        return [
            this.validateAllFieldsInModel(values, quiet),
        ].every(v => v === true);
    }
}
