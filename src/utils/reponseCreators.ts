import { errorCodes, errorMessages } from "@errors/errors";




type ApiResponse<T = unknown> = {
    statusCode: number;
    message: string;
    data?: T;
};

function createResponse<T>(
    statusCode: number,
    message: string,
    data?: T
): ApiResponse<T> {

    return {
        statusCode,
        message,
        data,
    };
}


export default createResponse;


