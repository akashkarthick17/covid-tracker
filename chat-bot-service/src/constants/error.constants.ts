
export class AppError {
    errorCode: string;
    errorMessage: string;
    constructor(errorCode: string, errorMessage: string) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}


export class ErrorMessage {
    static get INTERNAL_SERVER_ERROR() {
        return new AppError('ERR_INTERNAL_SERVER', 'Internal server error.');
    }

    static get INVALID_REQUEST_INPUT() {
        return new AppError('INVALID_REQUEST_INPUT', 'Invalid Request Input');
    }
}
