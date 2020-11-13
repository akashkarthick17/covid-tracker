import { AppError, ErrorMessage } from '../constants/error.constants';

export class ErrorHandler {
    static handle(error: any) {
        if (error instanceof AppError || (error?.errorCode && error?.errorMessage)) {
            return error;
        } else {
            return ErrorMessage.INTERNAL_SERVER_ERROR;
        }
    }
}