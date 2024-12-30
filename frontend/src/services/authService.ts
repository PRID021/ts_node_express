import { injectable, inject } from "inversify";
import { User } from "@/domain/models/User";
import type {
  AuthRepository,
  RegisterRequest,
  SignInRequest,
  VerifyRequest,
} from "@/domain/repositories/AuthRepository";
import { TYPES } from "@/types";
import type { StorageRepository } from "@/domain/repositories/StorageRepository";

// Define the type of the authServiceInstance

export interface AuthService {
  register: (userData: RegisterRequest) => Promise<User | null>;
  verify: (verifyData: VerifyRequest) => Promise<boolean>;
  signIn: (signInData: SignInRequest) => Promise<null>;
  logout: () => Promise<boolean>;
}
@injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @inject(TYPES.AuthRepository) private authRepository: AuthRepository,
    @inject(TYPES.StorageRepository)
    private storageRepository: StorageRepository
  ) {}

  register = async (userData: RegisterRequest): Promise<User | null> => {
    try {
      const severResponse = await this.authRepository.register(userData);
      return severResponse.data;
    } catch (error) {
      throw error;
    }
  };

  verify = async (verifyData: VerifyRequest): Promise<boolean> => {
    try {
      const severResponse = await this.authRepository.verify(verifyData);
      return severResponse.statusCode === 200001;
    } catch (error) {
      throw error;
    }
  };

  signIn = async (signInData: SignInRequest): Promise<null> => {
    try {
      await this.authRepository.signIn(signInData);
      return null;
    } catch (error) {
      throw error;
    }
  };

  logout = async (): Promise<boolean> => {
    try {
      await this.authRepository.logout();
      return true;
    } catch (error) {
      throw error;
    }
  };
}
