import { container } from "@/di-container";
import { CourseCategory } from "@/domain/models/CourseCategory";
import { CourseModuleRepository } from "@/domain/repositories/CourseModuleRepository";
import { TYPES } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { State } from "./hook.state";


export const useCourseModuleProvider = () => {
  const [state, setState] = useState<State<CourseCategory[]>>({
    data: null,
    isLoading: false,
    failure: null,
  });

  const fetchCourseModule = useCallback(async () => {
    const courseModuleRepo = container.get<CourseModuleRepository>(
      TYPES.CourseModuleRepository
    );
    if (!courseModuleRepo) return;

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      failure: null, // Reset failure on new request
    }));

    try {
      const serverResponse = await courseModuleRepo.getCourseCategory();

      console.log("serverResponse: ", serverResponse);
      serverResponse.whenSuccess((data) => {
        setState({
          data,
          isLoading: false,
          failure: null,
        });
      });

      serverResponse.whenFail((error) => {
        // Ensure error is handled correctly
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          failure: error instanceof Error ? error : new Error(error), // Ensure it's an Error object
        }));
      });
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        failure:
          err instanceof Error
            ? err
            : new Error("An unexpected error occurred"),
      }));
    }
  }, [] as const);

  useEffect(() => {
    fetchCourseModule();
  }, [fetchCourseModule]);

  return [state, { fetchCourseModule }] as const;
};
