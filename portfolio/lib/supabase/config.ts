import type { NextRequest } from "next/server";

export const SUPABASE_COOKIE_NAME = "sb-codings-auth";

export function getSupabaseUrl() {
  return process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
}

export function getSupabaseAnonKey() {
  return process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? null;
}

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  return raw.replace(/\/$/, "") || null;
}

export function isHttpsRequest(request: NextRequest) {
  return request.nextUrl.protocol === "https:";
}

export function isSafeRelativePath(path: string | null | undefined) {
  if (!path) return false;
  if (!path.startsWith("/")) return false;
  if (path.startsWith("//")) return false;
  return true;
}

