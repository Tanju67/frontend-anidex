import type { EpisodeType } from "../../shared/schemas/animeSchema";
import { formatDate } from "../../shared/utils/helper";

function EpisodesContentItem(props: EpisodeType) {
  const { id, title, aired, score, filler } = props;
  console.log(props);
  return (
    <li className="flex items-center justify-between gap-4 bg-white/10 px-2 py-1 text-xs capitalize sm:text-sm md:text-base xl:text-lg">
      <div className="flex w-full items-center gap-2">
        <span className="w-8 lg:w-10">Ep:{id}</span>
        <span
          className={`w-14 text-center sm:w-16 md:w-18 lg:w-20 ${filler ? "bg-red-500/50" : "bg-green-500/50 py-1"}`}
        >
          {filler ? "filler" : "cannon"}
        </span>
        <span className="w-16 md:w-20 lg:w-24">⭐ {score}/5</span>
        <span className="flex-1">{title}</span>
      </div>

      {aired && (
        <span className="hidden sm:block lg:hidden xl:block">
          aired:{formatDate(aired)}
        </span>
      )}
    </li>
  );
}

export default EpisodesContentItem;
