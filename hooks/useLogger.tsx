import { useCallback } from "react";
import { supabase } from "../services/supabaseClient";

type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  type: LogLevel;
  message: string;
  data?: any;
  created_at: string;
}

interface LoggerFn {
  (message: string, data?: any): Promise<void>;
}

export const useLogger = () => {
  const log = useCallback(
    async (type: LogLevel, message: string, data?: any) => {
      try {
        const logEntry: LogEntry = {
          type,
          message,
          data: data ? JSON.stringify(data) : null,
          created_at: new Date().toISOString(),
        };

        const { error } = await supabase.from("logs").insert([logEntry]);

        if (error) {
          console.error("Failed to log to database:", error);
        }

        // Also log to console for development
        switch (type) {
          case "info":
            console.log(`[INFO] ${message}`, data);
            break;
          case "warn":
            console.warn(`[WARN] ${message}`, data);
            break;
          case "error":
            console.error(`[ERROR] ${message}`, data);
            break;
        }
      } catch (error) {
        console.error("Logger error:", error);
      }
    },
    []
  );

  const info: LoggerFn = useCallback(
    (message: string, data?: any) => {
      return log("info", message, data);
    },
    [log]
  );

  const warn: LoggerFn = useCallback(
    (message: string, data?: any) => {
      return log("warn", message, data);
    },
    [log]
  );

  const error: LoggerFn = useCallback(
    (message: string, data?: any) => {
      return log("error", message, data);
    },
    [log]
  );

  return {
    info,
    warn,
    error,
  };
};
