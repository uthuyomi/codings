"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import style from "./slide.module.scss";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import pcOuter from "@/public/images/works/pc-back.png";
import spOuter from "@/public/images/works/sp-back.png";
import { WorkView } from "@/types/work"

type SlideProps = {
  data: WorkView;
};

const Slide = ({ data }: SlideProps) => {
  return (
    <div className="mt-20">
      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-700 bg-gray-900/70 shadow-lg shadow-teal-500/10 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* ===== Preview column（grid 影響を切るラッパー） ===== */}
          <div>
            {/* ===== スライダー前景（旧仕様そのまま） ===== */}
            <div className="relative w-full max-w-lg aspect-[1920/1280] min-h-[200px] mx-auto rounded-2xl border border-gray-700 bg-gray-800/70 shadow-lg shadow-teal-500/10 overflow-hidden z-20">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="absolute inset-0 !w-full !h-full"
              >
                {/* ===== PC ===== */}
                <SwiperSlide className={style["slide-pc"]}>
                  <Image className={style.slideOuter} src={pcOuter} alt="" />
                  <div className={style.slideInner}>
                    <Image
                      src={data.pcimg}
                      alt="pc preview"
                      width={1920}
                      height={1280}
                      unoptimized
                      className="rounded-lg border border-gray-600 shadow-md shadow-teal-400/10"
                    />
                  </div>
                </SwiperSlide>

                {/* ===== SP ===== */}
                <SwiperSlide className={style["slide-sp"]}>
                  <Image className={style.slideOuter} src={spOuter} alt="" />
                  <div className={style.slideInner}>
                    <Image
                      src={data.spimg}
                      alt="sp preview"
                      width={1920}
                      height={1280}
                      unoptimized
                      className="rounded-lg border border-gray-600 shadow-md shadow-teal-400/10"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          {/* ===== Info ===== */}
          <div className="flex flex-col p-6 text-gray-200">
            <h3 className="text-lg font-semibold text-teal-300">
              {data.title}
            </h3>

            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              {data.description}
            </p>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Tech Stack
              </p>
              <ul className="flex flex-wrap gap-2">
                {data.skill.map((item, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 rounded-full text-xs bg-gray-800 border border-gray-700 text-gray-300 hover:border-teal-400 hover:text-teal-300 transition"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-6 flex gap-3">
              <Link
                href={data.link}
                className="inline-flex items-center justify-center rounded-lg bg-teal-500/90 text-slate-900 text-sm font-medium px-5 py-2 hover:bg-teal-400 transition"
              >
                Demo
              </Link>

              {data.github && (
                <Link
                  href={data.github}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-600 text-gray-200 text-sm px-5 py-2 hover:border-teal-400 hover:text-teal-300 transition"
                >
                  GitHub
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
