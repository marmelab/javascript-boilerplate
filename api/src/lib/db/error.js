export default class DbError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this, this.contructor.name);
    }
}

export class ValidationError extends DbError {
    constructor(msg) { super(msg); }
}
