import { useParams } from "react-router-dom";
import {
  singleEpisodeSchema,
  type EpisodeType,
  type SingleEpisodeType,
} from "../../shared/schemas/animeSchema";
import { formatDate } from "../../shared/utils/helper";
import { useState } from "react";
import { useLazyGetEpisodeByEpisodeIdQuery } from "../../shared/api/animeApi";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import { Star } from "lucide-react";

function EpisodesContentItem(props: EpisodeType) {
  const { animeId } = useParams();
  const { id, title, aired, score, filler } = props;
  const [expanded, setExpanded] = useState(false);
  const [getEpisode, { data, isLoading, isFetching }] =
    useLazyGetEpisodeByEpisodeIdQuery();

  const getSynopsisHandler = () => {
    setExpanded((prev) => !prev);
    if (!expanded && !data) {
      getEpisode({ id: animeId!, episode: id! });
    }
  };

  let parsedData: SingleEpisodeType | null = null;
  if (data) {
    try {
      parsedData = singleEpisodeSchema.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <li className="group relative flex flex-col gap-3 rounded-xl border border-white/15 bg-white/10 p-3 transition-all duration-300 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-black/20">
      <div
        className={`absolute top-3 bottom-3 left-0 w-1 rounded-r-full ${filler ? "bg-red-500" : "bg-main-btn"}`}
      />

      <div className="flex flex-col gap-2 pl-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={getSynopsisHandler}
              className={`hover:bg-main-btn/20 hover:text-main-btn flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              <span className="text-xs">▼</span>
            </button>

            <span className="text-xs font-bold tracking-wider text-white/40 uppercase">
              Ep {id}
            </span>

            <span
              className={`rounded-md px-2 py-0.5 text-xs font-black tracking-widest uppercase ${
                filler
                  ? "border border-red-500/20 bg-red-500/10 text-red-400"
                  : "bg-main-btn/10 text-main-btn border-main-btn/20 border"
              }`}
            >
              {filler ? "filler" : "cannon"}
            </span>

            <span className="flex items-center gap-1 text-xs font-medium text-yellow-500/80">
              <Star size={12} fill="currentColor" /> {score}/5
            </span>
          </div>

          {aired && (
            <span className="hidden text-xs font-medium text-white/30 uppercase sm:block lg:hidden xl:block">
              {formatDate(aired)}
            </span>
          )}
        </div>

        {/* Alt Satır: Bölüm Başlığı */}
        <div className="mt-1">
          <h4
            className={`main-text-size font-semibold transition-colors ${expanded ? "text-main-btn" : "text-gray-200"}`}
          >
            {title}
          </h4>
        </div>
      </div>

      {/* Synopsis Alanı */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="main-text-size mt-2 rounded-lg border border-white/5 bg-black/20 p-3 leading-relaxed">
              {isLoading || isFetching ? (
                <div className="flex justify-center py-2">
                  <Spinner />
                </div>
              ) : (
                <p className="normal-case italic">
                  {parsedData?.synopsis ||
                    "No description available for this episode."}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default EpisodesContentItem;
