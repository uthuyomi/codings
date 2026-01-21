import style from "@/components/about/About.module.scss";
import Image from "next/image";
import { AboutProps } from "@/types/aboutAcf";

const About = ({acf} :AboutProps) => {

  return (
    <section className={style.about}>
      <div className={style.img}>
        <Image
          src={acf.about_img}
          alt={acf.about_img}
          width={100}
          height={100}
        />
      </div>
      <h2>{acf.about_heading}</h2>
      <p className="tagline">{acf.about_text}</p>
    </section>
  );
};

export default About;
