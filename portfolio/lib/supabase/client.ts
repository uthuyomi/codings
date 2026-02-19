import { createBrowserClient } from "@supabase/ssr";
import { parse, serialize } from "cookie";

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
