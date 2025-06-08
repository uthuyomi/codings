import GalleryListItem from "./GalleryListItem";
import style from "../scss/Gallery/Gallery.module.scss";

function GalleryList({ gallery }) {
  return (
    <div className={style.GalleryList}>
      {gallery.map((item, index) => (
        <GalleryListItem key={item.id} item={item} isLeft={index % 2 === 0} />
      ))}
    </div>
  );
}

export default GalleryList;
