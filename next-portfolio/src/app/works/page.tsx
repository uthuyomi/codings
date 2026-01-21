"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Slide from "@/components/works/Slide";
import Particle from "@/components/common/Particles";
import data from "@/data/worksdata.json";

export default function WorksPage() {
  // 言語切り替えボタンだけ残す
  const [currentLang, setCurrentLang] = useState<"ja" | "en">("ja");
  const base = data[currentLang];
  return (
    <>
      <Header onLangChange={setCurrentLang} />
      <Particle />
      <main className="relative z-20 pt-30 pl-5 pr-5">
        <div className="py-12 flex flex-col items-center -mt-20">
          {Object.entries(base).map(([key, item], i) => (
            <Slide
              key={key}
              data={item}
            />
          ))}
        </div>
      </main>
    </>
  );
}
