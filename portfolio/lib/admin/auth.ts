import crypto from "node:crypto";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  email: string;
  iat: number;
  exp: number;
};

function base64UrlEncode(input: Buffer | string) {
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf8");
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecodeToBuffer(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return Buffer.from(padded, "base64");
}

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("Missing env var: AUTH_SECRET");
  }
  return secret;
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function getSessionCookieOptions(request: NextRequest) {
  const isHttps = request.nextUrl.protocol === "https:";
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isHttps,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function createSessionToken(email: string) {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    email,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };

  const body = base64UrlEncode(JSON.stringify(payload));
  const sig = crypto
    .createHmac("sha256", getAuthSecret())
    .update(body)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return `${body}.${sig}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expectedSig = crypto
    .createHmac("sha256", getAuthSecret())
    .update(body)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  if (!timingSafeEqual(sig, expectedSig)) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(base64UrlDecodeToBuffer(body).toString("utf8")) as SessionPayload;
  } catch {
    return null;
  }

  if (!payload?.email || !payload?.exp) return null;
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) return null;

  return payload;
}

export function getAdminSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

type Pbkdf2Hash = {
  algorithm: "pbkdf2_sha256";
  iterations: number;
  salt: Buffer;
  hash: Buffer;
};

function parsePasswordHash(stored: string): Pbkdf2Hash | null {
  const parts = stored.split("$");
  if (parts.length !== 4) return null;
  const [algorithm, iterationsStr, saltB64, hashB64] = parts;
  if (algorithm !== "pbkdf2_sha256") return null;
  const iterations = Number(iterationsStr);
  if (!Number.isFinite(iterations) || iterations < 100_000) return null;
  try {
    return {
      algorithm: "pbkdf2_sha256",
      iterations,
      salt: Buffer.from(saltB64, "base64"),
      hash: Buffer.from(hashB64, "base64"),
    };
  } catch {
    return null;
  }
}

function constantTimeEqual(a: Buffer, b: Buffer) {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function verifyAdminPassword(password: string) {
  const plain = process.env.ADMIN_PASSWORD;
  if (plain) {
    const a = crypto.createHash("sha256").update(password, "utf8").digest();
    const b = crypto.createHash("sha256").update(plain, "utf8").digest();
    return crypto.timingSafeEqual(a, b);
  }

  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored) throw new Error("Missing env var: ADMIN_PASSWORD (or ADMIN_PASSWORD_HASH)");

  const parsed = parsePasswordHash(stored);
  if (!parsed) throw new Error("Invalid ADMIN_PASSWORD_HASH format");

  const derived = crypto.pbkdf2Sync(
    password,
    parsed.salt,
    parsed.iterations,
    parsed.hash.length,
    "sha256",
  );

  return constantTimeEqual(derived, parsed.hash);
}

export function isValidAdminEmail(email: string) {
  const expected = process.env.ADMIN_EMAIL;
  if (!expected) throw new Error("Missing env var: ADMIN_EMAIL");
  return expected.trim().toLowerCase() === email.trim().toLowerCase();
}
