import { appErrorCodes, appErrorMessages } from "./appErrors";


export type ApiResponse<T = unknown> = {
  statusCode: number;
  message: string;
  offset?: number;
  data?: T;
};



export const common200001Reponse = <T = unknown>(
  data?: T,
  message = "Success"
) => {
  let dataResponse: ApiResponse<T> = {
    statusCode: 200001,
    message: message,
    data: data,
  };
  return dataResponse;
};
export const unhandledErrorResponse: ApiResponse = {
  statusCode: appErrorCodes.unhandled.common,
  message: appErrorMessages.unhandled.common,
};

export const commonBadResponse: ApiResponse = {
  statusCode: appErrorCodes.badRequest.common,
  message: appErrorMessages.badRequest.common,
};
