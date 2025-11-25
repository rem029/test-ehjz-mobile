import { supabase } from "@/services/supabaseClient";
import * as Updates from "expo-updates";
import { Alert, BackHandler } from "react-native";

export const setupGlobalErrorHandler = () => {
  console.log("Setting up global error handler");
  // 1. Get the existing default handler (so we can call it if needed)
  const defaultErrorHandler = ErrorUtils.getGlobalHandler();

  // 2. Overwrite the global handler
  ErrorUtils.setGlobalHandler(async (error: any, isFatal?: boolean) => {
    console.error("Global JS Error Captured:", error);

    // 3. If it's not fatal, just log it and move on (or call default)
    if (!isFatal) {
      // Optional: Send to logging service (Sentry/Datadog)

      await supabase.from("logs").insert([
        {
          type: "error",
          message: `Error caught at global error handler: ${
            error?.message || "unknown"
          }`,
          data: JSON.stringify({ stack: error?.stack || "no stack" }),
          created_at: new Date().toISOString(),
        },
      ]);
      return;
    }

    // 4. IF FATAL: The app is unstable. We must alert the user.
    // We cannot render a React Component here because the JS loop might be broken.
    // We must use a native Alert.
    Alert.alert(
      "Unexpected Error",
      `The app encountered a critical error: ${error.name || "Unknown"}`,
      [
        {
          text: "Restart App",
          onPress: async () => {
            // Attempt to reload the bundle to "reset" the app
            try {
              await Updates.reloadAsync();
            } catch (e) {
              // If reload fails, kill the app
              BackHandler.exitApp();
            }
          },
        },
      ]
    );
  });
};
