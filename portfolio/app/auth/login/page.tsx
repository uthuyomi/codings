"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      setError(params.get("error"));
    } catch {
      setError(null);
    }

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        router.replace("/admin/works");
      }
    });
  }, [router, supabase]);

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
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
