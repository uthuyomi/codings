// app/layout.tsx
"use client";

import { Inter, JetBrains_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Particles from "@/components/common/Particles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // /admin 配下では Particles を表示しない
  const showParticles =
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/auth") &&
    !pathname.startsWith("/login");
  
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} antialiased relative`}
      >
        {showParticles && (
          <Particles />
        )}

        {children}
        <Analytics />
      </body>
    </html>
  );
}
