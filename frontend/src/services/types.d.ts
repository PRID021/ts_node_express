import "axios";
import { ServerResponse } from "@/services/types";
import { User } from "@/models/User";

export interface ServerResponse<R> {
  statusCode: number;
  message: string;
  data: R;
}

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean; // Add custom property
  }
}

/// AUTH
export type RegisterRequest = Omit<
  User,
  "id" | "avatar" | "is_verified" | "createdAt" | "updatedAt"
>;

// Define the type of the authServiceInstance
export interface AuthService {
  register: (userData: RegisterRequest) => Promise<ServerResponse<User>>;
}
