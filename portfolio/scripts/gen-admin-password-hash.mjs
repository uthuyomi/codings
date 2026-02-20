import crypto from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/gen-admin-password-hash.mjs "your-password"');
  process.exit(1);
}

const iterations = 210_000;
const salt = crypto.randomBytes(16);
const hash = crypto.pbkdf2Sync(password, salt, iterations, 32, "sha256");

const out = `pbkdf2_sha256$${iterations}$${salt.toString("base64")}$${hash.toString("base64")}`;
console.log(out);

