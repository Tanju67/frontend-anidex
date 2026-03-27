import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { PiTelevisionSimpleDuotone } from "react-icons/pi";
import { GiDuration } from "react-icons/gi";
import { MdMovieEdit } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import type { SliderItemType } from "../../shared/schemas/animeSchema";

function RandomAnimeItem({
  id,
  title,
  image,
  year,
  genres,
  synopsis,
  score,
  episodes,
  duration,
}: SliderItemType) {
  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat lg:py-8"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* 🌑 Gradient overlay (Netflix style) */}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/95 to-black/90" />

      {/* 🎯 Content */}
      <motion.div
        className="relative z-10 mx-auto flex h-full items-start justify-center gap-4 p-2 text-center md:p-12 lg:w-4/5 lg:gap-16 lg:p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="">
          <img
            src={image}
            alt=""
            className="h-60 w-40 rounded-2xl object-cover md:h-80 md:w-50 lg:h-120 lg:w-80"
          />
        </div>
        <div className="flex w-full flex-1 flex-col items-start justify-start gap-1">
          {/* Title */}
          <Link to={`/anime/${id}`} className="text-start">
            <h2 className="mb-2 line-clamp-1 cursor-pointer bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-base font-extrabold tracking-wide text-transparent drop-shadow-lg sm:text-xl md:text-3xl lg:mb-4 lg:text-5xl">
              {title}
            </h2>
          </Link>

          {/* Info */}
          {year && (
            <div className="flex items-center justify-start gap-2 text-sm md:text-base lg:text-lg">
              <span>
                <SlCalender />
              </span>
              <span>{year}</span>
            </div>
          )}
          <div className="flex flex-col flex-wrap items-start gap-1 text-sm text-gray-300 md:flex-row md:text-base lg:text-lg">
            {score && <span>⭐ {score}</span>}
            {episodes && <span>🎞️ {episodes} episodes</span>}
            {duration && <span>⌛ {duration}</span>}
          </div>

          {/* Synopsis */}
          {synopsis && (
            <p className="my-2 line-clamp-3 hidden text-start text-sm text-gray-300 italic md:block md:text-base lg:text-lg">
              {synopsis}
            </p>
          )}

          {genres.length > 0 && (
            <div className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
              <span className="flex items-center gap-2 md:mr-4">
                <PiTelevision />{" "}
                <span className="hidden md:block">Genres:</span>
              </span>
              <span>{genres.join(" | ")}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-4 flex w-full gap-4 text-sm md:text-base lg:text-lg">
            <Link to={`/anime/${id}`} className="w-full md:text-start">
              <button className="bg-main-btn hover:bg-main-btn-hover w-full rounded px-6 py-2 transition md:w-auto">
                ▶ More Info
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RandomAnimeItem;
