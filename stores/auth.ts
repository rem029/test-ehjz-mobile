import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

// Our global state management for authentication. Used zustand for simplicity.
export interface UserProfile {
  full_name?: string;
  dob?: string;
  address?: string;
}
interface AuthState {
  user: User | null;
  profile?: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  setProfile: (profile: UserProfile | null) => {
    set({ profile: profile });
  },

  setSession: (session: Session | null) => {
    set({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session?.user,
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setInitialized: (initialized: boolean) => {
    set({ isInitialized: initialized });
  },

  reset: () => {
    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
