import { useState } from "react";
import style from "../scss/hero/Hero.module.scss";
import Nav from "./Nav.js";
import { useTheme } from "../ThemeContext"; // ← 必要なら相対パス調整

import lightIcon from "../assets/button/button-light.png";
import darkIcon from "../assets/button/button-dark.png";

function Header() {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode } = useTheme(); 

  const icon = mode === "light" ? lightIcon : darkIcon;

  return (
    <header>
      <div className={style.logo}>
        <img src="" />
      </div>
      <button
        onClick={toggleMode}
        className={style.themeButton}
        style={{
          background: `url(${icon}) no-repeat center/contain`,
          border: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
        }}
      />
      <div
        className={`${style.hum} ${open ? style.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span className={style.line}></span>
        <span className={style.line}></span>
      </div>

      <Nav open={open} />
    </header>
  );
}
export default Header;
