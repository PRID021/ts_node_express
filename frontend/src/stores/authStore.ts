import { container } from "@/di-container";
import { User } from "@/domain/models/User";
import { UserService } from "@/services/userService";
import { TYPES } from "@/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  getProfile: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null, // Initial state
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  getProfile: async () => {
    try {
      const userService = container.get<UserService>(TYPES.UserService);
      const user = await userService.profile();
      set({ user });
    } catch {
      set({ user: null }); // Handle errors by setting user to null
    }
  },
}));

export default useAuthStore;
