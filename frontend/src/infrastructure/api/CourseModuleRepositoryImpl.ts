import { CourseCategory } from "@/domain/models/CourseCategory";
import {
  FailureResponse,
  ServerResponse,
  SuccessResponse,
} from "@/domain/models/ServerResponse";
import { CourseModuleRepository } from "@/domain/repositories/CourseModuleRepository";
import { TYPES } from "@/types";
import type { AxiosError, AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

// The implementation of CourseModuleRepository
@injectable()
export class CourseModuleRepositoryImpl implements CourseModuleRepository {
  constructor(
    @inject(TYPES.AxiosInstance) private axiosInstance: AxiosInstance
  ) {}

  // Method to get course categories
  getCourseCategory = async (): Promise<
    ServerResponse<CourseCategory[], Error>
  > => {
    try {
      const response = await this.axiosInstance.get("/course-module");
      // Assuming the response structure from axios matches ServerResponse
      const serverResponse: SuccessResponse<CourseCategory[]> =
        new SuccessResponse(
          response.status,
          response.statusText,
          response.data as CourseCategory[]
        );

      return serverResponse;
    } catch (error) {
      const axiosError = error as AxiosError;
      const serverResponse: ServerResponse<never, Error> = new FailureResponse(
        axiosError.response?.status || 500,
        axiosError.message || "An error occurred",
        axiosError
      );

      return serverResponse;
    }
  };
}
