import { useCallback, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuthStore } from "../stores/auth";

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

export const useAuth = () => {
  const {
    user,
    session,
    isAuthenticated,
    isLoading,
    isInitialized,
    setUser,
    setSession,
    setLoading,
    setInitialized,
    reset,
  } = useAuthStore();

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, setInitialized]);

  const signUp = useCallback(
    async (data: SignUpData) => {
      setLoading(true);
      try {
        // First, sign up with Supabase Auth (auto-confirmed)
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: data.email,
            password: data.password,
            phone: data.mobileNumber,
            options: {
              emailRedirectTo: undefined,
            },
          }
        );

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

        setSession(authData.session);
        return { user: authData.user, session: authData.session };
      } catch (error) {
        console.error("Sign up error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setSession, setLoading]
  );

  const signIn = useCallback(
    async (data: SignInData) => {
      setLoading(true);
      try {
        const { data: authData, error } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

        if (error) throw error;

        setSession(authData.session);
        return { user: authData.user, session: authData.session };
      } catch (error) {
        console.error("Sign in error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setSession, setLoading]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      reset();
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [reset, setLoading]);

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
    isInitialized,
    signUp,
    signIn,
    signOut,
  };
};
