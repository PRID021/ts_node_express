import { User } from "@/domain/models/User";
import { ServerResponse } from "../models/ServerResponse";

export type VerifyRequest = { code: string; user_id: string };

export type RegisterRequest = Omit<
  User,
  "id" | "avatar" | "is_verified" | "createdAt" | "updatedAt"
>;

export type SignInRequest = { user_name: string; password: string };

export interface AuthRepository {
  register: (userData: RegisterRequest) => Promise<ServerResponse<User, Error>>;
  verify: (
    verifyData: VerifyRequest
  ) => Promise<ServerResponse<undefined, Error>>;
  signIn: (
    signInData: SignInRequest
  ) => Promise<ServerResponse<undefined, Error>>;
  logout: () => Promise<ServerResponse<undefined, Error>>;
}
