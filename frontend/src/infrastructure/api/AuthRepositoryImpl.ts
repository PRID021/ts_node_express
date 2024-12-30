import { injectable, inject } from "inversify";
import { ServerResponse } from "@/domain/models/ServerResponse";
import { User } from "@/domain/models/User";
import {
  AuthRepository,
  RegisterRequest,
  SignInRequest,
  VerifyRequest,
} from "@/domain/repositories/AuthRepository";
import type { AxiosInstance } from "axios";
import { TYPES } from "../../types";

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @inject(TYPES.AxiosInstance) private axiosInstance: AxiosInstance
  ) {}

  register = async (
    userData: RegisterRequest
  ): Promise<ServerResponse<User>> => {
    return await this.axiosInstance.post("/auth/sign-up", userData);
  };

  verify = async (
    verifyData: VerifyRequest
  ): Promise<ServerResponse<undefined>> => {
    return await this.axiosInstance.post("/auth/verify-email", verifyData);
  };

  signIn = async (
    signInData: SignInRequest
  ): Promise<ServerResponse<undefined>> => {
    return await this.axiosInstance.post("/auth/sign-in", signInData);
  };
}
