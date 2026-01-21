"use client";

import { useEffect, useState } from "react";
import { ServiceContent } from "@/types/homeAcf";
import { fetchCustomType } from "@/lib/api";
import React from "react";
import Image from "next/image";
import style from "@/components/home/Service/Service.module.scss";

const ServiceItem = () => {
  const [services, setServices] = useState<ServiceContent[] | null>(null);

  useEffect(() => {
    fetchCustomType("service")
      .then(setServices)
      .then((err) => console.error("サービスアイテム取得エラー", err));
  }, []);

  return (
    <>
      {services?.map((item, index) => (
        <div
          key={item.id}
          className={`${style.Service_Item} ${
            index % 2 === 0 ? style.left : style.right
          }`}
          style={{ marginTop: index === 0 ? 0 : "-100px" }}
        >
          <div className={style.img}>
            <Image
              src={item.acf.service_item_thumbnail}
              alt="サムネイル"
              width={100}
              height={100}
            />
          </div>
          <h3>{item.acf.service_item_title}</h3>
          <p>{item.acf.service_item_text}</p>
        </div>
      ))}
    </>
  );
};

export default ServiceItem;
