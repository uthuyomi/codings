import style from "@/components/home/Service/Service.module.scss";
import ServiceItem from "@/components/home/Service/ServiceItem";
import { ServiceProps } from "@/types/homeAcf";

const Service = ({ acf }: ServiceProps) => {
  return (
    <div className={style.Service}>
      <h2>{acf.heading}</h2>
      <div className={style.Service_Item}>
        <ServiceItem />
      </div>
    </div>
  );
};

export default Service;
