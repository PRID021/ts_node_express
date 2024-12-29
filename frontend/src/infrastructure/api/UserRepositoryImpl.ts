import { ServerResponse } from "@/domain/models/ServerResponse";
import { User } from "@/domain/models/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { TYPES } from "@/types";
import type { AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject(TYPES.AxiosInstance) private axiosInstance: AxiosInstance
  ) {}
  getProfile = async (): Promise<ServerResponse<User>> => {
    return this.axiosInstance.get("/user", { requiresAuth: true });
  };
}
