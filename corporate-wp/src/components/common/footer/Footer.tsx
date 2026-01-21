import React from "react";
import Navi from "@/components/common/navi/Navi";
import style from "@/components/common/Footer/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <p>@ Kaisei Yasuzaki</p>
      <nav>
        <ul>
          <Navi />
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
