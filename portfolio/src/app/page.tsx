"use client";
import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/common/Header";
import Hero from "@/components/Hero";
import Service from "@/components/Service";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import Particle from "@/components/common/Particles";
import data from "@/data/data.json";

const Home = ({ lang = "ja" }: { lang?: "ja" | "en" }) => {
  const [currentLang, setCurrentLang] = useState(lang);
  const base = data[currentLang];
  return (
    <>
      <Header onLangChange={setCurrentLang} />
      <Particle />
      <main className="relative z-20">
        <Hero data={base.about} />
        <Service data={base.service} />
        <Skills data={base.skills} />
        <Contact data={base.contact} />
      </main>
    </>
  );
};

export default Home;
