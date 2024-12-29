import { User } from "@/domain/models/User";
import type { UserRepository } from "@/domain/repositories/UserRepository";
import { TYPES } from "@/types";
import { inject, injectable } from "inversify";

export interface UserService {
  profile: () => Promise<User>;
}

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {}
  profile = async (): Promise<User> => {
    try {
      const severResponse = await this.userRepository.getProfile();
      return severResponse.data;
    } catch (error) {
      throw error;
    }
  };
}
