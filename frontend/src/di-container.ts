// src/infrastructure/container.ts
import { Container } from "inversify";

import { TYPES } from "./types";
import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { AuthRepositoryImpl } from "./infrastructure/api/AuthRepositoryImpl";
import { AxiosInstance } from "axios";
import axiosInstance from "./infrastructure/axiosInstance";
import { AuthService, AuthServiceImpl } from "@/services/authService";
import { StorageRepository } from "./domain/repositories/StorageRepository";
import { StorageRepositoryImpl } from "./infrastructure/api/LocalStorageRepositoryImpl";
import { UserRepository } from "./domain/repositories/UserRepository";
import { UserRepositoryImpl } from "./infrastructure/api/UserRepositoryImpl";
import { UserService, UserServiceImpl } from "./services/userService";
import { FeaturingRepository } from "./domain/repositories/FeaturingRepository";
import { FeaturingRepositoryImpl } from "./infrastructure/api/FeaturingRepositoryImpl";

const container = new Container();
/// DI REPO
container
  .bind<AxiosInstance>(TYPES.AxiosInstance)
  .toConstantValue(axiosInstance);
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepositoryImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container
  .bind<StorageRepository>(TYPES.StorageRepository)
  .to(StorageRepositoryImpl);

container
  .bind<FeaturingRepository>(TYPES.FeaturingRepository)
  .to(FeaturingRepositoryImpl);
/// DI Service
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);

export { container };
