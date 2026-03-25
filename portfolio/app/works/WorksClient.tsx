"use client";

import Header from "@/components/common/Header";
import { useRouter } from "next/navigation";

export default function WorksClient({
  currentLang,
}: {
  currentLang: "ja" | "en";
}) {
  const router = useRouter();

  const handleLangChange = (lang: "ja" | "en") => {
    router.replace(`/works?lang=${lang}`);
    router.refresh(); // ← Server再実行
  };

  return <Header onLangChange={handleLangChange} />;
}
