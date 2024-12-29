import "axios";

export const TYPES = {
  AuthRepository: Symbol.for("AuthRepository"),
  AxiosInstance: Symbol.for("AxiosInstance"),
  AuthService: Symbol.for("AuthService"),
  StorageRepository: Symbol.for("StorageRepository"),
};

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean; // Add custom property
  }
}
