import style from "../scss/Gallery/Gallery.module.scss";
import siteData from "../siteData.json";
import GalleryList from "../Gallery/GalleryList";

function Gallery() {
    return(
  <div className={style.Gallery}>
    <GalleryList gallery={siteData.gallery} />
        </div>
        )}

export default Gallery;
