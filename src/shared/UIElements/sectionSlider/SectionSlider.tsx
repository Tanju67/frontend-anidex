import type { RowSliderType } from "../../schemas/animeSchema";
import RowSlider from "../sliders/RowSlider";

function SectionSlider({
  title,
  data,
}: {
  title: string;
  data: RowSliderType;
}) {
  return (
    <div className="bg-black px-2 py-4 sm:p-4 md:p-8 lg:p-16">
      <h2 className="mb-4 text-base font-bold text-white sm:text-lg md:text-2xl">
        {title}
      </h2>
      <RowSlider items={data} />
    </div>
  );
}

export default SectionSlider;
