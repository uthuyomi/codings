// "use client" は絶対に書かないこと！

import ParticlesBackground from "@/components/common/particles/ParticlesBackground";
import { fetchPage } from "@/lib/api";
import Header from "@/components/common/header/Header";
import Hero from "@/components/home/Hero/Hero";
import Service from "@/components/home/Service/Service";
import Skills from "@/components/home/Skills/Skills";
import Contact from "@/components/home/Contact/Contact";
import Profile from "@/components/home/Profile/Profile";
import Footer from "@/components/common/footer/Footer";


export default async function Index() {
  const page = await fetchPage(21);

  return (
    <>
      <Header />
      <ParticlesBackground />
      <Hero acf={page.acf} />
      <Profile acf={page.acf} />
      <Service acf={page.acf} />
      <Skills acf={page.acf} />
      <Contact acf={page.acf} />
      <Footer />
    </>
  );
}
