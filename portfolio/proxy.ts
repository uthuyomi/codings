import { NextResponse, type NextRequest } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin/session";

export async function proxy(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (session) return NextResponse.next();

  const next = request.nextUrl.pathname + request.nextUrl.search;
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/auth/login";
  redirectUrl.searchParams.set("next", next);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
