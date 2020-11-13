
export interface AppResponse<T> {
    isSuccess: boolean;
    responseBody: T;
}

export class ResponseUtility {
    static generateResponse<T>(isSuccess: boolean, body: T): AppResponse<T> {
        let response = {
            isSuccess: isSuccess,
            responseBody: body
        };
        return response;
    }
}