import React from "react";
import data from "../data/data.json";
import Image from "next/image";

type ItemData = {
  title: string;
  image: string;
  description: string;
};

type ServiceData = {
  title: string;
  items: ItemData[];
};

type ServiceProps = {
  data: ServiceData;
};

const Service = ({ data }: ServiceProps) => {
  return (
    <section className="w-full py-12 flex flex-col items-center mb-20 pt-30">
      <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-wide border-b border-gray-600 pb-2 mb-10">
        {data.title}
      </h2>

      {/* ✅ カード3枚横並び（モバイル1列、タブレット以上3列） */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-6">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="group rounded-2xl border border-gray-700 bg-gray-800/70 p-5 hover:border-teal-400 transition-colors"
          >
            {/* ✅ 白い画像プレースホルダー */}
            <div className="mb-4">
              <Image
                className="w-full object-cover aspect-[6/5] rounded-xl bg-white/95 shadow-sm ring-1 ring-white/40"
                src={item.image}
                alt="カード"
                width={100}
                height={100}
              />
            </div>

            {/* ✅ タイトルと説明 */}
            <h3 className="text-lg font-semibold text-teal-400 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {item.description}
            </p>

            {/* ✅ アクセントライン（hover時に出る下線） */}
            <div className="mt-4 h-px w-0 bg-teal-400 transition-all duration-300 group-hover:w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
