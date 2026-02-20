import { NextResponse, type NextRequest } from "next/server";
import { getAdminCookieName, getSessionCookieOptions } from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: getAdminCookieName(),
    value: "",
    ...getSessionCookieOptions(request),
    maxAge: 0,
  });
  return response;
}

