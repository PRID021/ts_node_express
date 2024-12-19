import { errorCodes, errorMessages } from "@errors/errors";
import { Response } from "express";

type ApiResponse<T = unknown> = {
  statusCode: number;
  message: string;
  offset?: number;
  data?: T;
};

/**
 * Sends a 200 Success response.
 * @param res Express response object.
 * @param message The success message to send.
 * @param data Optional additional data to include in the response.
 */
export const create200Response = <T = unknown>({
  res,
  message,
  offset,
  data,
}: {
  res: Response;
  message: string;
  data?: T;
  offset?: number;
}): void => {
  const response: ApiResponse<T> = {
    statusCode: 200,
    message,
    offset,
    data,
  };
  res.status(200).json(response);
};

/**
 * Creates a 500 Internal Server Error response.
 * @param offset Optional offset value.
 * @returns ApiResponse object for 500 status code.
 */
export const create500Response = <T = unknown>(
  res: Response,
  message?: string,
  offset?: number
): void => {
  const response: ApiResponse<T> = {
    statusCode: 500,
    message: message ?? errorMessages.internalServerError.common,
    offset,
  };
  res.status(200).json(response);
};

/**
 * Creates a 404 Not Found response.
 * @param type The specific type of "not found" (e.g., "user", "material").
 * @param offset Optional offset value.
 * @returns ApiResponse object for 404 status code.
 */
export const create404Response = (
  res: Response,
  type: keyof typeof errorCodes.notFound
): void => {
  const response: ApiResponse = {
    statusCode: errorCodes.notFound[type],
    message: errorMessages.notFound[type],
  };
  res.status(404).json(response);
};

export const create400CommonReponse = <T = unknown>(
  res: Response,
  message?: string
): void => {
  const response: ApiResponse<T> = {
    statusCode: errorCodes.badRequest.common,
    message: message ?? errorMessages.badRequest.common,
  };
  res.status(400).json(response);
};
