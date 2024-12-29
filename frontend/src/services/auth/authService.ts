import { injectable, inject } from "inversify";
import { User } from "@/domain/models/User";
import type {
  AuthRepository,
  RegisterRequest,
  SignInRequest,
  VerifyRequest,
} from "@/domain/repositories/AuthRepository";
import { TYPES } from "@/types";
import { UserToken } from "@/domain/models/UserToken";
import type { StorageRepository } from "@/domain/repositories/StorageRepository";

// Define the type of the authServiceInstance

export interface AuthService {
  register: (userData: RegisterRequest) => Promise<User | null>;
  verify: (verifyData: VerifyRequest) => Promise<boolean>;
  signIn: (signInData: SignInRequest) => Promise<UserToken | null>;
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

  signIn = async (signInData: SignInRequest): Promise<UserToken | null> => {
    try {
      const severResponse = await this.authRepository.signIn(signInData);
      const userToken = severResponse.data;
      if (userToken) {
        this.saveAuthTokens(userToken.access_token, userToken.refresh_token);
      }
      return userToken;
    } catch (error) {
      throw error;
    }
  };

  saveAuthTokens(accessToken: string, refreshToken: string): void {
    this.storageRepository.save("access_token", accessToken);
    this.storageRepository.save("refresh_token", refreshToken);
  }

  getAccessToken(): string | null {
    return this.storageRepository.retrieve<string>("access_token");
  }

  getRefreshToken(): string | null {
    return this.storageRepository.retrieve<string>("refresh_token");
  }

  removeAuthTokens(): void {
    this.storageRepository.remove("access_token");
    this.storageRepository.remove("refresh_token");
  }
}
