import Ajv from 'ajv';
import { ErrorMessage } from '../constants/error.constants';

export class RequestUtility {
    static validateSchema(schema: any, data: any): Promise<boolean> {
        try {
            const ajv = new Ajv();
            const validate = ajv.compile(schema);
            const valid = validate(data);
            if (!valid) {
                return Promise.reject(ErrorMessage.INVALID_REQUEST_INPUT);
            }
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(ErrorMessage.INTERNAL_SERVER_ERROR);
        }

    }
}