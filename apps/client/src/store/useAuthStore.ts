import { create } from 'zustand';
import type { User } from '../types';

export interface AuthState {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setAuthLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthLoading: true,
  setUser: (user) => set({ user, isAuthLoading: false }),
  clearUser: () => set({ user: null, isAuthLoading: false }),
  setAuthLoading: (loading) => set({ isAuthLoading: loading }),
}));
