import type { RowSliderType } from "../../schemas/animeSchema";
import RowSlider from "../sliders/RowSlider";

function SectionSlider({
  title,
  data,
}: {
  title?: string;
  data: RowSliderType;
}) {
  if (!title) return <RowSlider items={data} />;
  return (
    <section className="section-padding main-text-size">
      <h2 className="section-title-size mb-2 font-bold md:mb-4">{title}</h2>
      <RowSlider items={data} />
    </section>
  );
}

export default SectionSlider;
