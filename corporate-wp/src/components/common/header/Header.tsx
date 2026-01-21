import React from "react";
import style from "@/components/common/Header/Header.module.scss";
import Navi from "@/components/common/navi/Navi";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.menu}>
        <ul>
          <Navi />
        </ul>
      </div>
    </header>
  );
};

export default Header;
