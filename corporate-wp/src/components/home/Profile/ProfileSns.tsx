"use client";

import { useEffect, useState } from "react";
import { ProfileSnsProps } from "@/types/homeAcf";
import { fetchCustomType } from "@/lib/api";
import React from "react";
import style from "@/components/home/Profile/Profile.module.scss";
import Link from "next/link";
import Image from "next/image";

const ProfileSns = () => {
  const [acf, setAcf] = useState<ProfileSnsProps[] | null>(null);

  useEffect(() => {
    fetchCustomType("sns")
      .then(setAcf)
      .catch((err) => console.error("SNSアイテム情報取得エラー", err));
  }, []);

  return (
    <div className={style.Profile_Data_sns}>
      {acf?.map((item) => (
        <Link key={item.id} href={item.acf.sns_linkurl}>
          <div className={style.img}>
            <Image
              src={item.acf.sns_img_thumbnail}
              alt={item.acf.sns_img_thumbnail}
              width={100}
              height={100}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfileSns;
