import { User } from "@/domain/models/User";
import { ServerResponse } from "../models/ServerResponse";
import { UserToken } from "../models/UserToken";

export type VerifyRequest = { code: string; user_id: string };

export type RegisterRequest = Omit<
  User,
  "id" | "avatar" | "is_verified" | "createdAt" | "updatedAt"
>;

export type SignInRequest = { user_name: string; password: string };

export interface AuthRepository {
  register: (userData: RegisterRequest) => Promise<ServerResponse<User>>;
  verify: (verifyData: VerifyRequest) => Promise<ServerResponse<undefined>>;
  signIn: (signInData: SignInRequest) => Promise<ServerResponse<UserToken>>
}
