// src/infrastructure/repositories/StorageRepositoryImpl.ts

import { StorageRepository } from "@/domain/repositories/StorageRepository";

export class StorageRepositoryImpl implements StorageRepository {
  save<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value); // Serialize the value to store it
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving data for key "${key}":`, error);
    }
  }

  retrieve<T>(key: string): T | null {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue) as T; // Deserialize and return the value
      }
      return null;
    } catch (error) {
      console.error(`Error retrieving data for key "${key}":`, error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data for key "${key}":`, error);
    }
  }
}
