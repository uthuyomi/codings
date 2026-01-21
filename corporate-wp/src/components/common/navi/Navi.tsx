"use client";

import React from "react";
import { useEffect, useState } from "react";
import style from "@/components/common/Navi/Navi.module.scss";
import Link from "next/link";

type MenuItem = {
  ID: number;
  title: string;
  url: string;
};

const Navi = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch(
      "https://webyayasu.sakura.ne.jp/webyayasu-next/wp-json/menus/v1/menus/main_menu"
    )
      .then((res) => res.json())
      .then((data) => setMenu(data.items))
      .catch((err) => console.error("メニュー取得エラー", err));
  });
  return (
    <>
      {menu.map((item) => (
        <li key={item.ID} className={style.NaviList}>
          <Link href={item.url}>{item.title}</Link>
        </li>
      ))}
    </>
  );
};

export default Navi;
