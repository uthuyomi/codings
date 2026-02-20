import crypto from "node:crypto";

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
