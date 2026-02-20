"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [nextPath, setNextPath] = useState<string>("/admin/works");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      setError(params.get("error"));
      const next = params.get("next");
      if (next && next.startsWith("/") && !next.startsWith("//")) {
        setNextPath(next);
      }
    } catch {
      setError(null);
    }
  }, [router, nextPath]);

  async function loginWithPassword(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        setError(String(payload?.error ?? `Login failed (${res.status})`));
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100">
      <div className="w-full max-w-sm p-8 rounded-xl border border-gray-800 bg-gray-900">
        <h1 className="text-xl font-semibold text-center mb-6">Admin Login</h1>

        {error && (
          <p className="mb-4 text-sm text-red-300">
            Login failed: {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={loginWithPassword}>
          <input
            className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded bg-slate-800 border border-slate-700 px-4 py-2"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg bg-teal-500 text-black font-medium hover:bg-teal-400 transition"
          >
            {submitting ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </main>
  );
}
