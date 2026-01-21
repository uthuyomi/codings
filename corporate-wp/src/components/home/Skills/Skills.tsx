"use client";

import { useEffect, useState } from "react";
import React from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/mousewheel";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";
import { fetchCustomType } from "@/lib/api";
import { SkillContent } from "@/types/homeAcf";
import { SkillProps } from "@/types/homeAcf";
import Image from "next/image";
import style from "@/components/home/Skills/Skills.module.scss";

const Skills = ({ acf }:SkillProps) => {
  //動的にwordpressのACFを使ってskillセクションのアイテム情報を取得
  const [skill, setSkill] = useState<SkillContent[] | null>(null);

  useEffect(() => {
    fetchCustomType("skill")
      .then(setSkill)
      .catch((err) => console.error("スキルアイテム取得エラー", err));
  }, []);

  return (
    <section className={style.Skill}>
      <h2>{acf.skill_heading}</h2>
      <div className={style.Slider_wrapper}>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-pagination"></div>
        <Swiper
          className={style.SkillSlider}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          spaceBetween={30}
          slidesPerView={3} // or "auto" if you want variable width
        >
          {
            //ここからslideの処理
            skill?.map((item, index) => (
              <SwiperSlide key={index} className={style.SkillSliderItem}>
                <div className={style.img}>
                  <Image
                    src={item.acf.skill_item_thumbnail}
                    alt="サムネイル"
                    width={100}
                    height={100}
                  />
                </div>
                <div className={style.text}>
                  <p>{item.acf.skill_item_text}</p>
                  <div className={style.Level}>
                    <h3>スキルレベル</h3>
                    <div className={style.Level_img}>
                      <Image
                        src={item.acf.skill_item_level_img}
                        alt="dummy"
                        width={100}
                        height={100}
                      />
                      <p>{item.acf.skill_item_level_text}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
            //ここまで
          }
        </Swiper>
      </div>
    </section>
  );
};

export default Skills;
