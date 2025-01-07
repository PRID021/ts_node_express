export type State<T> = {
  data: T | null;
  isLoading: boolean;
  failure: Error | null;
};
