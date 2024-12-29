import { User } from '@/domain/models/User';
import { create } from 'zustand';

// Define the shape of your store
interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// Create the store with types
const useAuthStore = create<AuthState>((set) => ({
  user: null, // Initial state
  setUser: (user) => set({ user }), // Method to set user
  clearUser: () => set({ user: null }), // Method to clear user
}));

export default useAuthStore;
