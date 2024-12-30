import { User } from "@/domain/models/User";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  initializeUser: (fetchUser: () => Promise<User | null>) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null, // Initial state
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  initializeUser: async (fetchUser) => {
    try {
      const user = await fetchUser();
      set({ user });
    } catch {
      set({ user: null }); // Handle errors by setting user to null
    }
  },
}));

export default useAuthStore;
