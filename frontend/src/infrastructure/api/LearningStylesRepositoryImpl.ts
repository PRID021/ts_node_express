import { LearningStyle } from "@/domain/models/LearningStyle";
import {
  FailureResponse,
  ServerResponse,
  SuccessResponse,
} from "@/domain/models/ServerResponse";
import { LearningStylesRepository } from "@/domain/repositories/LearningStylesRepository";
import { TYPES } from "@/types";
import type { AxiosError, AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

@injectable()
export class LearningStylesRepositoryImpl implements LearningStylesRepository {
  constructor(
    @inject(TYPES.AxiosInstance) private axiosInstance: AxiosInstance
  ) {}

  getLearningStyles = async (): Promise<
    ServerResponse<LearningStyle[], Error>
  > => {
    try {
      const response = await this.axiosInstance.get("/learning-styles");
      const serverResponse: SuccessResponse<LearningStyle[]> =
        new SuccessResponse(
          response.status,
          response.statusText,
          response.data as LearningStyle[]
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
