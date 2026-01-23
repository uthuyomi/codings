"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Slide from "@/components/works/Slide";
import { WorkView } from "@/types/work";

export default function WorksPage() {
  // 言語切り替えボタンだけ残す
  const [currentLang, setCurrentLang] = useState<"ja" | "en">("ja");
  const [slides, setSlides] = useState<WorkView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);

      const res = await fetch(`/api/works?lang=${currentLang}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Failed to fetch works");
        setSlides([]);
        setLoading(false);
        return;
      }

      const data: WorkView[] = await res.json();
      setSlides(data);
      setLoading(false);
    };

    fetchWorks();
  }, [currentLang]);

  return (
    <>
      <Header onLangChange={setCurrentLang} />
      <main className="relative z-20 pt-30 pl-5 pr-5">
        <div className="py-12 flex flex-col items-center -mt-20">
          {loading && <p className="text-gray-400 text-sm">Loading works...</p>}

          {!loading &&
            slides.map((item) => <Slide key={item.id} data={item} />)}
        </div>
      </main>
    </>
  );
}
