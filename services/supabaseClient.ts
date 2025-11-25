import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Our supabase client setup for the app.

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!; // This needs to be set at .env
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!; // This needs to be set at .env

// Create the supabase client with async storage for React Native
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
