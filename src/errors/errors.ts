export const errorCodes = {
    unauthorized: {
        common: 401000,
        invalid: 401001,
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
    internalServerError: {
        common: 500000,
    },
    badRequest: {
        common: 400000,
        paramIsNaN: 400001,
    },
} as const;

export const errorMessages = {
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
    },
    notFound: {
        common: "Resource not found",
        user: "User not found",
        material: "Material not found",
    },
    internalServerError: {
        common: "Internal server error",
    },
    badRequest: {
        common: "Bad request",
        paramIsNaN: "Parameter is not a number",
    },
} as const;
