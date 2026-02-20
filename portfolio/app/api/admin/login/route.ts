import { NextResponse, type NextRequest } from "next/server";
import {
  createSessionToken,
  getAdminCookieName,
  getSessionCookieOptions,
  isValidAdminEmail,
  verifyAdminPassword,
} from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string } | null = null;
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    body = null;
  }

  const email = String(body?.email ?? "");
  const password = String(body?.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
  }

  const okEmail = isValidAdminEmail(email);
  const okPassword = verifyAdminPassword(password);
  if (!okEmail || !okPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: getAdminCookieName(),
    value: createSessionToken(email.trim().toLowerCase()),
    ...getSessionCookieOptions(request),
  });
  return response;
}

