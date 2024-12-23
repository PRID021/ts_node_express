// App Error Messages Map
interface AppErrorMessages {
  unauthorized: UnauthorizedErrorMessages;
  notFound: NotFoundErrorMessages;
  internalServerError: ErrorDetailMessages;
  badRequest: BadRequestErrorMessages;
  unhandled: UnhandledErrorMessages;
}

// App Error Definitions
interface AppErrorCodes {
  unauthorized: UnauthorizedErrorCodes;
  notFound: NotFoundErrorCodes;
  internalServerError: ErrorDetailCodes;
  badRequest: BadRequestErrorCodes;
  unhandled: UnhandledErrorCodes;
}

// Define Error Codes
export const appErrorCodes: AppErrorCodes = {
  unauthorized: {
    common: 401000,
    invalid: 401001,
    token: {
      requireRefresh: 401004,
    },
    login: {
      blank: 401002,
      token: { failure: 401003 },
    },
    resetPwd: {
      otp: { invalid: 401005, expired: 401006 },
    },
  },
  notFound: {
    common: 404000,
    user: 404001,
    material: 404002,
  },
  badRequest: {
    common: 400000,
    paramIsNaN: 400001,
  },
  internalServerError: {
    common: 500000,
  },
  unhandled: {
    common: 999999,
  },
};

// Define error messages
export const appErrorMessages: AppErrorMessages = {
  unauthorized: {
    common: "Unauthorized",
    invalid: "Auth token invalid or expired",
    login: {
      blank: "Email and password required",
      token: { failure: "Cannot generate token" },
    },
    resetPwd: {
      otp: { invalid: "OTP invalid", expired: "OTP expired" },
    },
    token: {
      requireRefresh: "Missing refresh token",
    },
  },
  notFound: {
    common: "Resource not found",
    user: "User not found",
    material: "Material not found",
  },
  badRequest: {
    common: "Bad request",
    paramIsNaN: "Parameter is not a number",
  },
  internalServerError: {
    common: "Internal server error",
  },
  unhandled: {
    common: "Something when wrong, try agianst later.",
  },
};
