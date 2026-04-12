import type { CreateWatchlistItem } from "../../shared/schemas/backendSchema";
import SmilarAnimeItem from "./SmilarAnimeItem";

type WatchListSimilarAnimeProps = {
  data: CreateWatchlistItem[];
};

function WatchListSimilarAnime({ data }: WatchListSimilarAnimeProps) {
  return (
    <ul className="flex flex-col gap-8">
      {data.map((item) => (
        <SmilarAnimeItem
          key={item.animeId}
          animeId={item.animeId}
          title={item.title}
        />
      ))}
    </ul>
  );
}

export default WatchListSimilarAnime;
