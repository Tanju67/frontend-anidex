import { motion } from "framer-motion";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { RiBookmark2Fill } from "react-icons/ri";
import { IoInformationCircleOutline } from "react-icons/io5";
import { data, Link } from "react-router-dom";
import {
  useCreateAnimeMutation,
  useGetSingleAnimeQuery,
} from "../../shared/api/backendApi";
import type { SliderItemType } from "../../shared/schemas/animeSchema";
import type { MyBackendError } from "../../shared/types/types";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import { toaster } from "../../shared/utils/toaster";
import { ToastContainer } from "react-toastify";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { createWatchlistItemSchema } from "../../shared/schemas/backendSchema";
import { is } from "zod/v4/locales";
import WatchlistButton from "../../shared/UIElements/button/WatchlistButton";

function SliderItem({
  title,
  synopsis,
  year,
  score,
  image,
  id,
  genres,
}: SliderItemType) {
  return (
    <motion.div
      className="relative flex h-[calc(80vh-var(--nav-height))] min-w-full items-end justify-center bg-cover bg-center bg-no-repeat md:h-[calc(60vh-var(--nav-height))] md:pb-[15vh] lg:h-[calc(100vh-var(--nav-height))] lg:pb-[20vh] 2xl:bg-size-[50%] 2xl:bg-right"
      style={{
        backgroundImage: `url(${image})`,
      }}
      initial={{ opacity: 0.8, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient overlay */}
      <div className="overlay-header" />

      {/* Content */}
      <div className="relative z-10 mb-6 w-full p-4 text-center md:mb-0 md:flex-1 md:p-[10vw] md:text-left">
        <Link to={`anime/${id}`}>
          <h2 className="animeTitle">{title}</h2>
        </Link>

        <p className="mb-4 flex justify-center gap-4 md:justify-start">
          {score && <span>⭐ {score} / 10</span>}
          {year && <span>📅 {year}</span>}
          {genres && <span>🎉 {genres.join(" | ")}</span>}
        </p>

        <p className="mb-8 hidden lg:line-clamp-4">{synopsis}</p>
        <div>
          <div className="flex justify-center gap-2 text-center md:justify-start">
            <Button
              isLink={true}
              link={`/anime/${id}`}
              className="bg-main-btn hover:bg-main-btn-hover border-main-btn main-btn-lg content-center-x gap-2 border-2"
            >
              <span>
                <IoInformationCircleOutline />
              </span>
              <span>More Details</span>
            </Button>
            <WatchlistButton
              id={String(id)}
              title={String(title)}
              image={image}
            />
          </div>
        </div>
      </div>

      <div className="hidden flex-1 md:block" />
      <ToastContainer />
    </motion.div>
  );
}

export default SliderItem;
