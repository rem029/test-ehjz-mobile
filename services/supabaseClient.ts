import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://supabasekong-u4400c4ko4c0ogs044gc8gkw.app.rem029.com";
const supabaseAnonKey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2Mzk5MzIyMCwiZXhwIjo0OTE5NjY2ODIwLCJyb2xlIjoiYW5vbiJ9.Q4dRzzUcAOrLmbEnhbu6jJqqVeoKyncoAravFZPTGdI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
