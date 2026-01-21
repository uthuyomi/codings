import style from '@/components/home/Hero/Hero.module.scss'
import Link from "next/link";
import React from "react";
import { HeroProps } from '@/types/homeAcf';

const Hero = ({ acf }: HeroProps) => {

  return (
    <section id="top" className={style.Hero}>
      <div className={style.About_Hero_heading}>
        <h1>{acf.hero_heading}</h1>
        <p>{acf.hero_text}</p>
        <Link href={acf.hero_link|| "#"}>{acf.hero_link_label}</Link>
      </div>
    </section>
  );
};

export default Hero;
