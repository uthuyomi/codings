import style from "../scss/Gallery/Gallery.module.scss";

function GalleryListText({ item, link }) {
  return (
    <>
      <div className={style.info}>
        <p className={style.overview}>{item.overview}</p>
        <ul>
          <li>
            <strong>範囲：</strong>
            {item.scope}
          </li>
          <li>
            <strong>技術：</strong>
            {item.tech}
          </li>
          <li>
            <strong>期間：</strong>
            {item.period}
          </li>
          <li>
            <strong>工夫：</strong>
            {item.notes}
          </li>
        </ul>
      </div>

      <a href={link}>MORE</a>
    </>
  );
}

export default GalleryListText;
