import "swiper/css";
import style from "../scss/Gallery/Gallery.module.scss";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import pcbackimg from "../assets/pc-back.png";
import spbackimg from "../assets/sp-back.png";

function GalleryListItemImg({ item }) {
  return (
    <Swiper
      className={style.img}
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
    >
      <SwiperSlide className={`swiper-slide ${style.pc}`}>
        <img className={style.back_img} src={pcbackimg} alt="" />
        <div className={style.slide_outer}>
          <img
            src={require(`../assets/gallery-img/${item.imagepc}`)}
            alt={item.title}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className={`swiper-slide ${style.sp}`}>
        <img className={style.back_img} src={spbackimg} alt="" />
        <div className={style.slide_outer}>
          <img
            src={require(`../assets/gallery-img/${item.imagesp}`)}
            alt={item.title}
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default GalleryListItemImg;
