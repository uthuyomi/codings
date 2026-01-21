import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["webyayasu.sakura.ne.jp"], // ← ★ココ追加
  },
};

export default nextConfig;
