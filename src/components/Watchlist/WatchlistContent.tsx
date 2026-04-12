import type { CreateWatchlistItem } from "../../shared/schemas/backendSchema";
import WatchlistContentItem from "./WatchlistContentItem";

type WatchlistContentProps = {
  data: CreateWatchlistItem[];
  handleRemove: (id: string) => void;
};
function WatchlistContent({ data, handleRemove }: WatchlistContentProps) {
  return (
    <ul className="grid w-full grid-cols-3 gap-2 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {data.map((item, i) => (
        <WatchlistContentItem
          key={item.animeId + "grid" + i}
          {...item}
          handleRemove={handleRemove}
        />
      ))}
    </ul>
  );
}

export default WatchlistContent;
