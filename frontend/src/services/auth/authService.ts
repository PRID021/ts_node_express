import { User } from "@/models/User";
import {
  AuthService,
  RegisterRequest,
  ServerResponse,
  VerifyRequest,
} from "@/services/types";
import axiosInstance from "@/services/axiosInstance";

const register = async (
  userData: RegisterRequest
): Promise<ServerResponse<User>> => {
  return await axiosInstance.post("/auth/sign-up", userData, {
    requiresAuth: false, // No Bearer token needed for registration
  });
};

const verify = async (
  verifyData: VerifyRequest
): Promise<ServerResponse<undefined>> => {
  return await axiosInstance.post("/auth/verify-email", verifyData, {
    requiresAuth: false,
  });
};

// Create the authServiceInstance and type it with the `AuthService` interface
export const authServiceInstance: AuthService = {
  register,
  verify,
};
