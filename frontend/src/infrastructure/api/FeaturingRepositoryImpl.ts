import { Featuring } from "@/domain/models/Featuring";
import { ServerResponse } from "@/domain/models/ServerResponse";
import { FeaturingRepository } from "@/domain/repositories/FeaturingRepository";
import { TYPES } from "@/types";
import type { AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

@injectable()
export class FeaturingRepositoryImpl implements FeaturingRepository {
  constructor(
    @inject(TYPES.AxiosInstance) private axiosInstance: AxiosInstance
  ) {}

  getFeaturings = async (): Promise<ServerResponse<Featuring[]>> => {
    return this.axiosInstance.get("/featurings");
  };
}
