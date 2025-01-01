import { useEffect, useState } from "react";
import { container } from "@/di-container";
import { TYPES } from "@/types";
import { FeaturingRepository } from "@/domain/repositories/FeaturingRepository";

export const useFeaturingRepo = () => {
  const [featuringRepo, setFeaturingRepo] =
    useState<FeaturingRepository | null>(null);

  useEffect(() => {
    const service = container.get<FeaturingRepository>(
      TYPES.FeaturingRepository
    );
    setFeaturingRepo(service);
  }, []);

  return featuringRepo;
};
