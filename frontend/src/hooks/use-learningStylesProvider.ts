import { container } from "@/di-container";
import { LearningStyle } from "@/domain/models/LearningStyle";
import { LearningStylesRepository } from "@/domain/repositories/LearningStylesRepository";
import { TYPES } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// Custom hook
export const useLearningStylesProvider = () => {
  const repo = useMemo(
    () =>
      container.get<LearningStylesRepository>(TYPES.LearningStylesRepository),
    []
  );

  const fetchLearningStyles = async (): Promise<LearningStyle[]> => {
    const result = await repo.getLearningStyles();

    const rs = result.match({
      success: (data) => data,
      fail: (error) => {
        throw error;
      },
    });

    if (rs instanceof Error) {
      throw rs;
    }
    return rs as LearningStyle[];
  };

  return useQuery({
    queryKey: ["learningStyles"],
    queryFn: fetchLearningStyles,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 3, // Retry failed requests up to 3 times
  });
};
