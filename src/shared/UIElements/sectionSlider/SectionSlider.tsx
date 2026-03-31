import type { RowSliderType } from "../../schemas/animeSchema";
import RowSlider from "../sliders/RowSlider";

function SectionSlider({
  title,
  data,
  skeleton = false,
  children,
}: {
  title?: string;
  data: RowSliderType;
  skeleton?: boolean;
  children?: React.ReactNode;
}) {
  if (!title && !skeleton) return <RowSlider items={data} />;
  return (
    <section className="section-padding main-text-size">
      <h2 className="section-title-size mb-2 font-bold md:mb-4">{title}</h2>
      {!skeleton && <RowSlider items={data} />}
      {children}
    </section>
  );
}

export default SectionSlider;
