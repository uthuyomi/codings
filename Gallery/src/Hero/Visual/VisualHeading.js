import React, { useState, useEffect } from "react";

const VisualHeading = ({ text = "", delay = 100 }) => {
  const [displayedElements, setDisplayedElements] = useState([]);

  useEffect(() => {
    console.log("受け取ったテキスト", text);
    if (!text || typeof text !== "string") return;

    // 1. 文字列を配列化（br対応）
    const parts = text.split(/(\{\{br\}\})/); // 分割して{{br}}も保持
    const flatChars = [];

    parts.forEach((part) => {
      if (part === "{{br}}") {
        flatChars.push("<br>"); // 特別に記号として扱う
      } else {
        flatChars.push(...part.split(""));
      }
    });

    // 2. アニメーション的に1つずつ追加
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedElements((prev) => [...prev, flatChars[currentIndex]]);
      currentIndex++;
      if (currentIndex >= flatChars.length) clearInterval(interval);
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  // 3. 出力時に <br> だけJSX要素に置き換える
  return (
    <span>
      {displayedElements.map((char, i) =>
        char === "<br>" ? <br key={i} /> : <span key={i}>{char}</span>
      )}
    </span>
  );
};

export default VisualHeading;
