import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isHttpsRequest,
  SUPABASE_COOKIE_NAME,
} from "@/lib/supabase/config";

export async function proxy(request: NextRequest) {
  const supabaseUrl = getSupabaseUrl();
  const supabaseAnonKey = getSupabaseAnonKey();

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  if (process.env.AUTH_DEBUG === "1") {
    const incomingAuthCookieNames = request.cookies
      .getAll()
      .map((c) => c.name)
      .filter((name) => name.startsWith("sb-"));
    console.log("[proxy] incoming cookies", {
      total: request.cookies.getAll().length,
      sb: incomingAuthCookieNames,
    });
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookieOptions: {
      name: SUPABASE_COOKIE_NAME,
      path: "/",
      sameSite: "lax",
      secure: isHttpsRequest(request),
    },
    cookies: {
      encode: "tokens-only",
      getAll() {
        return request.cookies.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        if (process.env.AUTH_DEBUG === "1" && cookiesToSet.length > 0) {
          console.log("[proxy] setAll", {
            count: cookiesToSet.length,
            cookies: cookiesToSet.map((c) => ({
              name: c.name,
              valueLength: c.value.length,
              maxAge: c.options?.maxAge,
              path: c.options?.path,
              sameSite: c.options?.sameSite,
              secure: (c.options as any)?.secure,
              httpOnly: (c.options as any)?.httpOnly,
            })),
          });
        }
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set({ name, value, ...options });
        });
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    const next = request.nextUrl.pathname + request.nextUrl.search;
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/auth/login";
    redirectUrl.searchParams.set("next", next);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
