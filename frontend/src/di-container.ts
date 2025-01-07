// src/infrastructure/container.ts
import { Container } from "inversify";

import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { AuthService, AuthServiceImpl } from "@/services/authService";
import { AxiosInstance } from "axios";
import { CourseModuleRepository } from "./domain/repositories/CourseModuleRepository";
import { FeaturingRepository } from "./domain/repositories/FeaturingRepository";
import { StorageRepository } from "./domain/repositories/StorageRepository";
import { UserRepository } from "./domain/repositories/UserRepository";
import { AuthRepositoryImpl } from "./infrastructure/api/AuthRepositoryImpl";
import { CourseModuleRepositoryImpl } from "./infrastructure/api/CourseModuleRepositoryImpl";
import { FeaturingRepositoryImpl } from "./infrastructure/api/FeaturingRepositoryImpl";
import { StorageRepositoryImpl } from "./infrastructure/api/LocalStorageRepositoryImpl";
import { UserRepositoryImpl } from "./infrastructure/api/UserRepositoryImpl";
import axiosInstance from "./infrastructure/axiosInstance";
import { UserService, UserServiceImpl } from "./services/userService";
import { TYPES } from "./types";

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
container
  .bind<CourseModuleRepository>(TYPES.CourseModuleRepository)
  .to(CourseModuleRepositoryImpl);

/// DI Service
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);

export { container };
