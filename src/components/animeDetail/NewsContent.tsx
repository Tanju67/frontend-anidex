import type { AllNewsType } from "../../shared/schemas/animeSchema";
import NewsContentItem from "./NewsContentItem";

type NewsConentProps = {
  data: AllNewsType;
};

function NewsContent({ data }: NewsConentProps) {
  console.log(data);
  return (
    <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {data.map((item) => (
        <NewsContentItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

export default NewsContent;
