function GalleryListText({ item, link }) { 
  return (
    <>
      <ul>
        {item.map((skill) => (
          <li>{skill}</li>
        ))}
      </ul>
      <a href={link}>MORE</a>
    </>
  );
}

export default GalleryListText;