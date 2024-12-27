// Interfaces for Error Codes and Nested Structures
interface ErrorDetailCodes {
  common: number;
  [key: string]: number | NestedErrorDetailCodes;
}

interface NestedErrorDetailCodes {
  [key: string]: number | NestedErrorDetailCodes;
}

interface ErrorDetailMessages {
  common: string;
  [key: string]: string | NestedErrorDetailMessages;
}

interface NestedErrorDetailMessages {
  [key: string]: string | NestedErrorDetailMessages;
}

// Unauthorized Error Details
interface UnauthorizedErrorCodes extends ErrorDetailCodes {
  invalid: number;
  token: {
    requireRefresh: number;
  };
  login: {
    blank: number;
    token: { failure: number };
  };
  resetPwd: {
    otp: { invalid: number; expired: number };
  };
  verify: {
    tokenInvalid: number
  };
}

interface UnauthorizedErrorMessages extends ErrorDetailMessages {
  invalid: string;
  token: {
    requireRefresh: string;
  };
  login: {
    blank: string;
    token: { failure: string };
  };
  resetPwd: {
    otp: { invalid: string; expired: string };
  };
  verify: {
    tokenInvalid: string
  };
}

// Not Found Error Details
interface NotFoundErrorCodes extends ErrorDetailCodes {
  user: number;
  material: number;
}

interface NotFoundErrorMessages extends ErrorDetailMessages {
  user: string;
  material: string;
}

// Bad Request Error Details
interface BadRequestErrorCodes extends ErrorDetailCodes {
  paramIsNaN: number;
  userExits: number;
}

interface BadRequestErrorMessages extends ErrorDetailMessages {
  paramIsNaN: string;
  userExits: string;
}

// Unauthorized Error Messages
interface UnauthorizedErrorMessages extends ErrorDetailMessages {
  invalid: string;
  login: {
    blank: string;
    token: { failure: string };
  };
  resetPwd: {
    otp: { invalid: string; expired: string };
  };
}

// Not Found Error Messages
interface NotFoundErrorMessages extends ErrorDetailMessages {
  user: string;
  material: string;
}

// Bad Request Error Messages
interface BadRequestErrorMessages extends ErrorDetailMessages {
  paramIsNaN: string;
}

// Define Unhandled Error Codes
interface UnhandledErrorCodes {
  common: number;
}

// Define Unhandled Error Messages
interface UnhandledErrorMessages {
  common: string;
}
