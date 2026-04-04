import type { RowSliderType } from "../../schemas/animeSchema";
import GridContentItem from "./GridContentItem";

type GridContentPropsType = {
  data: RowSliderType;
};

function GridContent({ data }: GridContentPropsType) {
  return (
    <ul className="grid w-full grid-cols-2 gap-2 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {data.map((item, i) => (
        <GridContentItem key={item.id + "grid" + i} {...item} />
      ))}
    </ul>
  );
}

export default GridContent;
