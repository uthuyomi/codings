"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSiteUrl } from "@/lib/supabase/config";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [nextPath, setNextPath] = useState<string>("/admin/works");

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

    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.replace(nextPath);
    });
  }, [router, nextPath]);

  const loginWithGoogle = async () => {
    const supabase = createSupabaseBrowserClient();
    const siteUrl = getSiteUrl() ?? location.origin.replace(/\/$/, "");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100">
      <div className="w-full max-w-sm p-8 rounded-xl border border-gray-800 bg-gray-900">
        <h1 className="text-xl font-semibold text-center mb-6">Admin Login</h1>

        {error && (
          <p className="mb-4 text-sm text-red-300">
            Login failed: {error}
          </p>
        )}

        <button
          onClick={loginWithGoogle}
          className="w-full py-3 rounded-lg bg-teal-500 text-black font-medium hover:bg-teal-400 transition"
        >
          Googleでログイン
        </button>
      </div>
    </main>
  );
}
