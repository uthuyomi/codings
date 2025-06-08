import style from "../scss/hero/Hero.module.scss";
import { useScrollTrigger } from "../hooks/useScrollTrigger"; //トリガーフック読み込み
import VisualHeading from "./Visual/VisualHeading";
import bottomarrow from "../assets/bottom-arrow.png";
import topImg from "../assets/top.jpg"

function Visual({ hero }) {
  const [ref, isVisible] = useScrollTrigger({
    threshold: 1.0,
    rootMargin: "0px 0px -500px 0px",
    once: true,
  });

  return (
    <div className={style.visual}>
      <div className={style.mainview}>
        <div className={style.img}>
          <img src={topImg} alt="main-visual" />
        </div>
      </div>
      <h1>
        <VisualHeading text={hero.catch} />
      </h1>

      <div className={style.bottomarrow}>
        <a href="">Lean more</a>
        <span ref={ref} className={isVisible ? style.active : ""}>
        </span>
      </div>
    </div>
  );
}

export default Visual;
