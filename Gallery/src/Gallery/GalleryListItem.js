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

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setSlideY(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const wrapperClass = isLeft
    ? `${style.GalleryLeftitem} ${!isMobile && inView ? style.slideX : ""} ${
        slideY ? (isMobile ? style.slideYMobile : style.slideY) : ""
      }`
    : `${style.GalleryRightitem} ${!isMobile && inView ? style.slideX : ""} ${
        slideY ? (isMobile ? style.slideYMobile : style.slideY) : ""
      }`;

  return (
    <div ref={ref} className={wrapperClass}>
      <GalleryListItemImg item={item} />
      <div className={style.text}>
        <h2>{item.title}</h2>
        <GalleryListText item={item.skills} link={item.link} />
      </div>
    </div>
  );
}

export default GalleryListItem;
