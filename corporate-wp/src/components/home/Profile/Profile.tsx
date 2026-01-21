import style from "@/components/home/Profile/Profile.module.scss";
import Image from "next/image";
import React from "react";
import ProfileSns from "@/components/home/Profile/ProfileSns";
import { ProfileProps } from "@/types/homeAcf";

const TopAboutProfile = ({ acf }: ProfileProps) => {
  return (
    <div className={style.Profile}>
      <h2>{acf.profile_heading01}</h2>
      <div className={style.img}>
        <Image
          src={acf.profile_img}
          alt={acf.profile_img}
          width={100}
          height={200}
        />
      </div>
      <div className={style.Profile_Data}>
        <h3>{acf.profile_heading02}</h3>
        <p>{acf.profile_text}</p>
        <ProfileSns />
      </div>
    </div>
  );
};

export default TopAboutProfile;
