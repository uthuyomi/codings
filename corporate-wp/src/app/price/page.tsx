// src/app/price/page.tsx

import ParticlesBackground from "@/components/common/particles/ParticlesBackground";
import { fetchPage } from "@/lib/api";
import Header from "@/components/common/header/Header";
import Hero from "@/components/home/Hero/Hero";
import Footer from "@/components/common/footer/Footer";
import PriceTable from "../../components/price/PriceContent";

export default async function PricePage() {
  const home = await fetchPage(21);
  const page = await fetchPage(96);

  return (
    <>
      <Header />
      <ParticlesBackground />
      <Hero acf={page.acf} />
      <PriceTable acf={page.acf} />
      <Footer />
    </>
  );
}
