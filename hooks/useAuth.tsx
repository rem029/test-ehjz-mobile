import { useCallback, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuthStore } from "../stores/auth";
import { useLogger } from "./useLogger";

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
    setUser,
    setProfile,
    setSession,
    setLoading,
    setInitialized,
    reset,
  } = useAuthStore();
  const { error: errorMsg, info } = useLogger();

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      console.log("Initializing auth state...");
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        await errorMsg("Failed to initialize auth:", error);
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
      if (event === "SIGNED_OUT") setProfile(null);
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser, setLoading, setInitialized]);

  const fetchUserProfile = useCallback(
    async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("full_name, dob, address")
          .eq("id", userId)
          .single();

        if (error) throw error;
        setProfile(data);
        return data;
      } catch (error) {
        await errorMsg("Failed to fetch user profile:", error);
        return null;
      }
    },
    [errorMsg, setProfile]
  );

  const signUp = useCallback(
    async (data: SignUpData) => {
      console.log("at signUp...", data.email, data.mobileNumber);
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
              data,
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
        info("User signed up successfully:", data.email);
        return { user: authData.user, session: authData.session };
      } catch (error) {
        await errorMsg("Sign up error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setSession, setLoading, errorMsg, info]
  );

  const signIn = useCallback(
    async (data: SignInData) => {
      console.log("at signsignIn...");
      setLoading(true);
      try {
        const { data: authData, error } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

        if (error) throw error;

        setSession(authData.session);
        info("User signed in successfully:", authData.user?.email);
        await fetchUserProfile(authData.user!.id);
        return { user: authData.user, session: authData.session };
      } catch (error) {
        await errorMsg("Sign in error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setSession, info, fetchUserProfile, errorMsg]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    console.log("at signOut...");
    try {
      const _user = user?.email;

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      info("User signed out successfully:", _user);
      reset();
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [info, reset, setLoading, user?.email]);

  return {
    signUp,
    signIn,
    signOut,
  };
};
