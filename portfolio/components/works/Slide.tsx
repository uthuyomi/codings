// components/works/Slide.tsx
import type { WorkView } from "@/types/work";
import SlideClient from "./SlideClient";

export default function Slide({ data }: { data: WorkView }) {
  return (
    <div className="mt-20">
      <div className="sr-only">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <p>{data.skill.join(", ")}</p>
      </div>
      <SlideClient data={data} />
    </div>
  );
}
