import type { AllPromosType } from "../../shared/schemas/animeSchema";
import TrailerContentItem from "./TrailerContentItem";

type TrailerContentProps = {
  data: AllPromosType;
};
function TrailerContent({ data }: TrailerContentProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {data.map((item, index) => (
        <TrailerContentItem key={`promo-${item.id}-${index}`} {...item} />
      ))}
    </ul>
  );
}

export default TrailerContent;
