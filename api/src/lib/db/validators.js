import { ValidationDbError } from './error';

export function validateAllFieldsInModel(model, values, quiet = false) {
    const fields = Object
                    .keys(values)
                    .filter(field => model.allFields.indexOf(field) === -1);

    if (fields.length > 0) {
        if (!quiet) {
            throw new ValidationDbError(`Fields "${fields.join(', ')}" are not in model.
            Availables fields are: ${model.allFields().join(', ')}`);
        }

        return false;
    }

    return true;
}

export default {
    validateAllFieldsInModel,
};
