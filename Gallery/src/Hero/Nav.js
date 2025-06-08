import style from"../scss/hero/Hero.module.scss";
import siteData from "../siteData.json";

function Nav({ open }) {
  return (
    <nav className={`${ open ? style.navOpen : "" }`}>
      <ul>
        {siteData.nav.map((item) => (
          <li key={item.id}>
            <a href={item.url}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
