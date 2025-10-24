import style from "../scss/Gallery/Gallery.module.scss";

function GalleryListText({ item, link }) {
  return (
    <>
      <div className={style.info}>
        <p>
          <strong>制作概要：</strong>
          {item.overview}
        </p>
        <p>
          <strong>担当範囲：</strong>
          {item.scope}
        </p>
        <p>
          <strong>使用技術：</strong>
          {item.tech}
        </p>
        <p>
          <strong>制作期間：</strong>
          {item.period}
        </p>
        <p>
          <strong>工夫点：</strong>
          {item.notes}
        </p>
      </div>

      <a href={link}>MORE</a>
    </>
  );
}

export default GalleryListText;
