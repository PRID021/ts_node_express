import "axios";

export const TYPES = {
  AuthRepository: Symbol.for("AuthRepository"),
  UserRepository: Symbol.for("UserRepository"),
  AxiosInstance: Symbol.for("AxiosInstance"),
  CourseModuleRepository: Symbol.for("CourseModuleRepository"),
  AuthService: Symbol.for("AuthService"),
  StorageRepository: Symbol.for("StorageRepository"),
  UserService: Symbol.for("UserService"),
  FeaturingRepository: Symbol.for("FeaturingRepository"),
  LearningStylesRepository: Symbol.for("LearningStylesRepository"),
};

export interface TokenRetrieve {
  getAccessToken: () => string | null;
}
declare module "axios" {
  // export interface AxiosRequestConfig {
  //   requiresAuth?: boolean;
  //   tokenRetrieve?:  TokenRetrieve
  // }
}
