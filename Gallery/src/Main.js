import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Hero from "./Hero/Hero";
import Gallery from "./Gallery/Gallery";
import Footer from "./Footer/Footer";
import { useTheme } from "./ThemeContext"; // ← 必要なら相対パス調整

function Main() { 
    const { mode } = useTheme(); // ボタン状況取得
     return (
        <React.StrictMode>
        <main className={`${mode}`}>
           <Hero />
            <Gallery />
            <Footer />
        </main>
        </React.StrictMode>
    );
}

export default Main;