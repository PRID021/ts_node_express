import { CourseCategory } from "../models/CourseCategory";
import { ServerResponse } from "../models/ServerResponse";

export interface CourseModuleRepository {
  getCourseCategory: () => Promise<ServerResponse<CourseCategory[], Error>>;
}
