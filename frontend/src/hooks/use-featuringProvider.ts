import { container } from "@/di-container";
import { Featuring } from "@/domain/models/Featuring";
import { FeaturingRepository } from "@/domain/repositories/FeaturingRepository";
import { TYPES } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { State } from "./hook.state";

export const useFeaturingProvider = () => {
  const [state, setState] = useState<State<Featuring[]>>({
    data: null,
    isLoading: false,
    failure: null,
  });
  const repo = useMemo(
    () => container.get<FeaturingRepository>(TYPES.FeaturingRepository),
    []
  );

  const fetchFeaturing = useCallback(async () => {
    const serverResponse = await repo.getFeaturings();
    serverResponse.whenSuccess((data) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        data: data,
      }));
    });

    serverResponse.whenFail((error) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        failure: error instanceof Error ? error : new Error(error),
      }));
    });
  }, [repo]);

  useEffect(() => {
    fetchFeaturing();
  }, [fetchFeaturing]);

  return [state, fetchFeaturing] as const;
};
