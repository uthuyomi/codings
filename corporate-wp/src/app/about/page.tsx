import React from "react";
import { fetchPage } from "@/lib/api";
import ParticlesBackground from "@/components/common/particles/ParticlesBackground";
import Header from "@/components/common/header/Header";
import Hero from "@/components/home/Hero/Hero";
import Footer from "@/components/common/footer/Footer";
import style from "@/components/about/About.module.scss";
import About from "@/components/about/About";
import SkillSet from "@/components/about/SkillSet";

export default async function AboutPage() {
  const home = await fetchPage(21);
  const page = await fetchPage(127);

  return (
    <>
      <Header />
      <ParticlesBackground />
      <Hero acf={home.acf} />
      <div className={style.page}>
        <About acf={page.acf} />
        <SkillSet acf={page.acf} />
      </div>
      <Footer />
    </>
  );
}
