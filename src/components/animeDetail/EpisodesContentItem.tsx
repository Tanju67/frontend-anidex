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

function EpisodesContentItem(props: EpisodeType) {
  const { animeId } = useParams();
  const { id, title, aired, score, filler } = props;
  const [expanded, setExpanded] = useState(false);
  const [getEpisode, { data, isLoading, isFetching }] =
    useLazyGetEpisodeByEpisodeIdQuery();

  const getSynopsisHandler = () => {
    if (!expanded) getEpisode({ id: animeId!, episode: id! });
    setExpanded(!expanded);
  };

  let parsedData: SingleEpisodeType | null = null;
  if (data) {
    try {
      parsedData = singleEpisodeSchema.parse(data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(parsedData);
  return (
    <li className="flex flex-col gap-2 bg-white/10 px-2 py-1 text-xs capitalize sm:text-sm md:text-base xl:text-lg">
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center gap-2">
          <span onClick={getSynopsisHandler} className="cursor-pointer">
            {expanded && <span>&uarr;</span>}
            {!expanded && <span>&darr;</span>}
          </span>
          <span className="w-8 lg:w-10">Ep:{id}</span>
          <span
            className={`w-14 py-1 text-center sm:w-16 md:w-18 lg:w-20 ${filler ? "bg-red-500/50" : "bg-green-500/50"}`}
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
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {isLoading || isFetching ? (
              <p className="flex justify-center">
                <Spinner />
              </p>
            ) : (
              <p>{data?.synopsis}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default EpisodesContentItem;
