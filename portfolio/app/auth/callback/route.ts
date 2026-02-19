import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    console.error("[auth/callback] Missing code param", { url: request.url });
    return NextResponse.redirect(`${origin}/auth/login?error=missing_code`);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (set them in Vercel Project Settings).",
    );
  }

  // ✅ 最初から redirect response を作る
  const response = NextResponse.redirect(`${origin}/admin/works`);

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map(({ name, value }) => ({ name, value }));
        },
        setAll(cookiesToSet) {
          console.log("[auth/callback] setAll", {
            count: cookiesToSet.length,
            cookies: cookiesToSet.map((c) => ({
              name: c.name,
              valueLength: c.value.length,
              maxAge: c.options?.maxAge,
            })),
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] exchangeCodeForSession failed", {
      message: error.message,
      name: error.name,
      status: (error as any).status,
      code: (error as any).code,
    });
    return NextResponse.redirect(`${origin}/auth/login?error=exchange_failed`);
  }

  console.log("[auth/callback] exchangeCodeForSession ok");
  return response;
}
