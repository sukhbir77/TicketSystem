import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = "Error Connecting to database";

    constructor() {
        super("Error Connecting to DB");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [
            {
                message: this.reason
            }
        ]
    }
}