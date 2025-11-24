import { supabase } from "./supabaseClient";
import type { AuthError, User } from "@supabase/supabase-js";

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  dob: string;
  address: string;
  mobileNumber: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const authService = {
  async signUp(data: SignUpData) {
    try {
      // First, sign up with Supabase Auth (auto-confirmed)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        phone: data.mobileNumber,
        options: {
          emailRedirectTo: undefined,
        },
      });

      if (authError) throw authError;

      // If successful, create user profile
      if (authData.user) {
        const { error: profileError } = await supabase.from("users").insert([
          {
            id: authData.user.id,
            full_name: data.fullName,
            dob: data.dob,
            address: data.address,
          },
        ]);

        if (profileError) throw profileError;
      }

      return { user: authData.user, session: authData.session };
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  },

  async signIn(data: SignInData) {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      return { user: authData.user, session: authData.session };
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ?? null);
    });
  },
};
