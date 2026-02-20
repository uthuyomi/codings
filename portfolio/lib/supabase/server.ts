import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  SUPABASE_COOKIE_NAME,
} from "@/lib/supabase/config";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  const supabaseUrl = getSupabaseUrl();
  const supabaseAnonKey = getSupabaseAnonKey();

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (set them in Vercel Project Settings).",
    );
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookieOptions: {
        name: SUPABASE_COOKIE_NAME,
        path: "/",
        sameSite: "lax",
        secure: true,
      },
      cookies: {
        encode: "tokens-only",
        getAll() {
          return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
        },
        // Server Components can't set response cookies.
        // Auth flows that need setting cookies should do so in Route Handlers/Middleware.
        setAll() {},
      },
    },
  );
}
