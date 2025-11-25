import { supabase } from "@/services/supabaseClient";
import * as Updates from "expo-updates";
import { Alert, BackHandler } from "react-native";

// Wanted to try error handling at a global level. Included in code but this was not tested.

export const setupGlobalErrorHandler = () => {
  console.log("Setting up global error handler");

  const defaultErrorHandler = ErrorUtils.getGlobalHandler();

  ErrorUtils.setGlobalHandler(async (error: any, isFatal?: boolean) => {
    console.error("Global JS Error Captured:", error);

    if (!isFatal) {
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

    Alert.alert(
      "Unexpected Error",
      `The app encountered a critical error: ${error.name || "Unknown"}`,
      [
        {
          text: "Restart App",
          onPress: async () => {
            try {
              await Updates.reloadAsync();
            } catch (e) {
              BackHandler.exitApp();
            }
          },
        },
      ]
    );
  });
};
