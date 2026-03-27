import type { EpisodesType } from "../../shared/schemas/animeSchema";
import EpisodesContentItem from "./EpisodesContentItem";

type EpisodesContentProps = {
  data: EpisodesType;
};

function EpisodesContent({ data }: EpisodesContentProps) {
  return (
    <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {data.map((item) => (
        <EpisodesContentItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

export default EpisodesContent;
