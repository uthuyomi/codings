"use client";

import React from 'react'
import { useEffect, useState } from "react";
import style from "@/components/about/SkillSet.module.scss";
import { AboutProps } from "@/types/aboutAcf";
import { fetchCustomType, fetchPage } from "@/lib/api";
import { AboutSkill } from "@/types/aboutAcf";

const SkillSet = ({acf}: AboutProps) => {
     const [skillset, setSkillset] = useState<AboutSkill[]>([]);
    
    useEffect(() => {
      //スキルセット情報の取得
      fetchCustomType("about_skill_item")
        .then(setSkillset)
        .catch((err) => console.error("スキルセット取得エラー", err));
    }, []);
    
  return (
      <section className={style.skillset}>
        <h2>{acf.about_skill_heading}</h2>
        <ul className={style.skillsGrid}>
          {skillset.map((item) => (
            <li key={item.id}>
              <h3>{item.acf.about_skillset_heading}</h3>
              <p>{item.acf.about_skillset_text}</p>
            </li>
          ))}
        </ul>
      </section>
  );
}

export default SkillSet