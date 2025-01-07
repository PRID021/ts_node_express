/* eslint-disable @typescript-eslint/no-unused-vars */
// Base class for ServerResponse
export abstract class ServerResponse<R, F> {
  abstract status: "success" | "failure";
  constructor(public statusCode: number, public message: string) {}

  // Abstract methods for handling success and failure
  abstract whenSuccess(callback: (data: R) => void): void;
  abstract whenFail(callback: (failure: F) => void): void;
}

// SuccessResponse class
export class SuccessResponse<R> extends ServerResponse<R, never> {
  status = "success" as const;

  constructor(statusCode: number, message: string, public data: R) {
    super(statusCode, message);
  }

   whenSuccess = (callback: (data: R) => void): void => {
    callback(this.data);
  };

  whenFail = (_: (failure: never) => void): void => {
    // No operation for success
  };
}

// FailureResponse class
export class FailureResponse<F> extends ServerResponse<never, F> {
  status = "failure" as const;

  constructor(statusCode: number, message: string, public error: Error) {
    super(statusCode, message);
  }

  whenSuccess = (_: (data: never) => void): void => {
    // No operation for failure
  };

  whenFail = (callback: (failure: F) => void): void => {
    callback(this.error as F);
  };
}
