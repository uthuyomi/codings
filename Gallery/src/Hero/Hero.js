import style from "../scss/hero/Hero.module.scss";
import siteData from "../siteData.json";
import Header from "./Header.js";
import Visual from "./Visual.js";

function Hero() {
  return (
    <div className={style.hero}>
      {/*ヘッダー要素*/}
      <Header header={siteData.header} />
      {/*herosection */}
      <Visual hero={siteData.hero} />
    </div>
  );
}

export default Hero;
