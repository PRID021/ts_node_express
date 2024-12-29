// src/infrastructure/container.ts
import { Container } from "inversify";

import { TYPES } from "./types";
import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { AuthRepositoryImpl } from "./infrastructure/api/AuthRepositoryImpl";
import { AxiosInstance } from "axios";
import axiosInstance from "./infrastructure/axiosInstance";
import { AuthService, AuthServiceImpl } from "@/services/auth/authService";
import { StorageRepository } from "./domain/repositories/StorageRepository";
import { StorageRepositoryImpl } from "./infrastructure/api/LocalStorageRepositoryImpl";

const container = new Container();
/// DI REPO
container
  .bind<AxiosInstance>(TYPES.AxiosInstance)
  .toConstantValue(axiosInstance);
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepositoryImpl);
container
  .bind<StorageRepository>(TYPES.StorageRepository)
  .to(StorageRepositoryImpl);

/// DI Service
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl);

export { container };
