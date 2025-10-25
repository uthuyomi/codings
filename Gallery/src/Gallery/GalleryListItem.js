import { useEffect, useState } from "react";
import style from "../scss/Gallery/Gallery.module.scss";
import { useScrollTrigger } from "../hooks/useScrollTrigger";
import GalleryListText from "./GalleryListText";
import GalleryListItemImg from "./GalleryListItemImg";

function GalleryListItem({ item, isLeft }) {
  const [ref, inView] = useScrollTrigger({
    threshold: 0.7,
    rootMargin: "0px 0px -100px 0px",
    once: true,
  });

  const [slideY, setSlideY] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 画面サイズを監視
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // スクロール時アニメーション
  useEffect(() => {
    // 1199px以下ではアニメーション無効
    if (isMobile) return;

    if (inView) {
      const timer = setTimeout(() => {
        setSlideY(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [inView, isMobile]);

  // クラス名設定
  const wrapperClass = isLeft
    ? `${style.GalleryLeftitem} ${!isMobile && inView ? style.slideX : ""} ${
        !isMobile && slideY ? style.slideY : ""
      }`
    : `${style.GalleryRightitem} ${!isMobile && inView ? style.slideX : ""} ${
        !isMobile && slideY ? style.slideY : ""
      }`;

  return (
    <div ref={ref} className={wrapperClass}>
      <GalleryListItemImg item={item} />
      <div className={style.text}>
        <h2>{item.title}</h2>
        <GalleryListText item={item} link={item.link} />
      </div>
    </div>
  );
}

export default GalleryListItem;
