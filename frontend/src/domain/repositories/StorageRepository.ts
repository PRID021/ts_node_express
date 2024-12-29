
export interface StorageRepository {
  save: <T>(key: string, value: T) => void;
  retrieve: <T>(key: string) => T | null;
  remove: (key: string) => void;
}
