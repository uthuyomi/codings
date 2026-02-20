import { createBrowserClient } from "@supabase/ssr";
import { parse, serialize } from "cookie";
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  SUPABASE_COOKIE_NAME,
} from "@/lib/supabase/config";

export function createSupabaseBrowserClient() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseAnonKey = getSupabaseAnonKey();
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase env vars for browser client.");
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookieOptions: {
        name: SUPABASE_COOKIE_NAME,
        path: "/",
        sameSite: "lax",
        secure:
          typeof window !== "undefined" &&
          window.location &&
          window.location.protocol === "https:",
      },
      cookies: {
        encode: "tokens-only",
        getAll() {
          if (typeof document === "undefined") return [];
          const parsed = parse(document.cookie ?? "");
          return Object.keys(parsed).map((name) => ({ name, value: parsed[name] ?? "" }));
        },
        setAll(cookiesToSet) {
          if (typeof document === "undefined") return;
          cookiesToSet.forEach(({ name, value, options }) => {
            document.cookie = serialize(name, value, options);
          });
        },
      },
    },
  );
}
