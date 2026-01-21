import React from "react";
import Image from "next/image";
import data from "../data/data.json";
import style from "./Skills.module.scss";

type SkillItem = {
  icon: string;
  title: string;
  description: string;
};

type SkillsData = {
  title: string;
  items: SkillItem[];
};

type SkillsProps = {
  data: SkillsData;
};

const Skills = ({ data }: SkillsProps) => {
  return (
    <section
      className={`${style.Skills} w-full bg-gray-900 py-16 flex flex-col items-center mb-20`}
    >
      {/* タイトル */}
      <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-wide border-b border-gray-600 pb-2 mb-10">
        {data.title}
      </h2>

      {/* カードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-6">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="group flex items-center rounded-2xl border border-gray-700 bg-gray-800/70 p-6 hover:border-teal-400 transition-colors"
          >
            {/* 左側：アイコン領域 */}
            <div className="flex-shrink-0 w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-sm ring-1 ring-white/40 mr-6">
              <Image
                src={item.icon}
                alt={item.title}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            {/* 右側：テキスト部分 */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-teal-400 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* hover下線 */}
              <div className="mt-3 h-px w-0 bg-teal-400 transition-all duration-300 group-hover:w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
