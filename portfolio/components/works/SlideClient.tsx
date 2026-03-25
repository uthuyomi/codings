"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";
import style from "./slide.module.scss";
import { WorkView } from "@/types/work";

import pcOuter from "@/public/images/works/pc-back.png";
import spOuter from "@/public/images/works/sp-back.png";

export default function SlideClient({ data }: { data: WorkView }) {
  const previewSlides = [
    {
      key: "pc",
      outer: pcOuter,
      src: data.pcimg,
      className: style["slide-pc"],
    },
    ...(data.spimg
      ? [
          {
            key: "sp",
            outer: spOuter,
            src: data.spimg,
            className: style["slide-sp"],
          },
        ]
      : []),
  ];

  return (
    <div className="mx-auto max-w-5xl rounded-2xl border border-gray-700 bg-gray-900/70 shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Swiper */}
        <div className="relative w-full max-w-lg aspect-[1920/1280] mx-auto">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="absolute inset-0"
          >
            {previewSlides.map((s) => (
              <SwiperSlide key={s.key} className={s.className}>
                <Image src={s.outer} alt="" />
                <div className={style.slideInner}>
                  <Image src={s.src} alt="" width={1920} height={1280} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Info */}
        <div className="p-6 text-gray-200">
          <h3 className="text-lg text-teal-300">{data.title}</h3>
          <p className="text-sm text-gray-400 mt-2">{data.description}</p>

          <ul className="flex flex-wrap gap-2 mt-4">
            {data.skill.map((item, i) => (
              <li key={i} className="text-xs bg-gray-800 px-2 py-1 rounded">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-3">
            <Link href={data.link}>Demo</Link>
            {data.github && <Link href={data.github}>GitHub</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}
