"use client";
import { useState } from "react";
import data from "@/data/navi.json";
import Nav from "@/components/common/nav";

type HeaderProps = {
  onLangChange: (lang: "ja" | "en") => void;
};

const Header = ({ onLangChange }: HeaderProps) => {
  const [lang, setLang] = useState<"ja" | "en">("ja");

  const toggleLang = () => {
    const newLang = lang === "ja" ? "en" : "ja";
    setLang(newLang);
    onLangChange(newLang);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-black/50 backdrop-blur-md border-b border-gray-700 px-6 py-3">
      <div className="flex justify-between items-center">
        {/* 左：タイトル */}
        <h1 className="text-white text-lg font-semibold tracking-wide">
          Yasuzaki Kaisei
        </h1>

        {/* 右：言語ボタン */}
        <button
          onClick={toggleLang}
          className="text-sm bg-gray-800 text-white border border-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          {lang === "ja" ? "English" : "日本語"}
        </button>
      </div>

      {/* 下段にナビ配置（スマホ時はドロップダウン） */}
      <div className="mt-2.5 mr-6 md:mr-10">
        <Nav data={data} />
      </div>
    </header>
  );
};

export default Header;
