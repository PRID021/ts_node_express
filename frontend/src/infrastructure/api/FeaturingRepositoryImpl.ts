import { Featuring } from "@/domain/models/Featuring";
import {
  FailureResponse,
  ServerResponse,
  SuccessResponse,
} from "@/domain/models/ServerResponse";
import { FeaturingRepository } from "@/domain/repositories/FeaturingRepository";
import { TYPES } from "@/types";
import type { AxiosError, AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

@injectable()
export class FeaturingRepositoryImpl implements FeaturingRepository {
  constructor(
    @inject(TYPES.AxiosInstance) private axiosInstance: AxiosInstance
  ) {}

  // Method to get featurings
  getFeaturings = async (): Promise<ServerResponse<Featuring[], Error>> => {
    try {
      const response = await this.axiosInstance.get("/featurings");

      // Assuming the response structure from axios matches ServerResponse
      const serverResponse: SuccessResponse<Featuring[]> = new SuccessResponse(
        response.status,
        response.statusText,
        response.data as Featuring[]
      );

      return serverResponse;
    } catch (error) {
      const axiosError = error as AxiosError;

      // Create a FailureResponse in case of an error
      const serverResponse: ServerResponse<never, Error> = new FailureResponse(
        axiosError.response?.status || 500,
        axiosError.message || "An error occurred",
        axiosError
      );

      return serverResponse;
    }
  };
}
