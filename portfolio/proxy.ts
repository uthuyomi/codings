import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const incomingAuthCookieNames = request.cookies
    .getAll()
    .map((c) => c.name)
    .filter((name) => name.startsWith("sb-"));
  console.log("[proxy] incoming cookies", {
    total: request.cookies.getAll().length,
    sb: incomingAuthCookieNames,
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
    cookies: {
      encode: "tokens-only",
      getAll() {
        return request.cookies.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        if (cookiesToSet.length > 0) {
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

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
