"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Slide from "@/components/works/Slide";
import type { WorkView } from "@/types/work";

type Props = {
  initialLang: "ja" | "en";
  initialWorks: WorkView[];
};

export default function WorksClient({ initialLang, initialWorks }: Props) {
  const [currentLang, setCurrentLang] = useState<"ja" | "en">(initialLang);
  const [slides, setSlides] = useState<WorkView[]>(initialWorks);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentLang === initialLang) return;

    const ac = new AbortController();
    const fetchWorks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/works?lang=${currentLang}`, {
          cache: "no-store",
          signal: ac.signal,
        });

        if (!res.ok) {
          console.error("Failed to fetch works");
          return;
        }

        const data: WorkView[] = await res.json();
        setSlides(data);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
    return () => ac.abort();
  }, [currentLang, initialLang]);

  return (
    <>
      <Header onLangChange={setCurrentLang} />
      <main className="relative z-20 pt-30 pl-5 pr-5">
        <div className="py-12 flex flex-col items-center -mt-20">
          {loading && (
            <p className="text-gray-400 text-sm">Loading works...</p>
          )}

          {slides.map((item) => (
            <Slide key={item.id} data={item} />
          ))}
        </div>
      </main>
    </>
  );
}

