import React from "react";
import Image from "next/image";
import style from "./Hero.module.scss";

type SocialLink = {
  label: string;
  url: string;
  img: string;
};

type AboutData = {
  title: string;
  image: string;
  name: string;
  description: string[];
  social: SocialLink[];
};

type HeroProps = {
  data: AboutData;
};

const Hero = ({ data }: HeroProps) => {
  return (
    <section
      className={`${style.Hero} w-full bg-gray-900 py-20 flex flex-col items-center text-center md:text-left pt-44`}
    >
      {/* タイトル */}
      <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-wide border-b border-gray-600 pb-2 mb-10">
        {data.title}
      </h2>

      {/* コンテンツ本体 */}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl w-full px-6">
        {/* 左：アイコン領域 */}
        <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-10">
          <div className="relative w-40 h-40 rounded-full overflow-hidden ring-2 ring-teal-400 shadow-lg shadow-teal-400/10">
            <Image
              src={data.image}
              alt={data.name}
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
        </div>

        {/* 右：テキストエリア */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-teal-400 text-xl md:text-2xl font-bold mb-3">
            {data.name}
          </h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md">
            {data.description.map((item, i) => (
              <span key={i}>
                {item}
                <br />
              </span>
            ))}
          </p>

          {/* ソーシャルリンク */}
          <div className="flex space-x-5 mt-6">
            {data.social.map((item, i) => (
              <a
                key={i}
                href={item.url}
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-700 hover:border-teal-400 transition"
              >
                <Image
                  src={item.img}
                  alt={item.label}
                  width={24}
                  height={24}
                  className="opacity-90 hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
