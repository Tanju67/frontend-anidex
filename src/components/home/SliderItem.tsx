import { motion } from "framer-motion";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import type { SliderItemType } from "../../shared/schemas/animeSchema";
import Button from "../../shared/UIElements/button/Button";
import WatchlistButton from "../../shared/UIElements/button/WatchlistButton";
import { ToastContainer } from "react-toastify";

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

        <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium md:justify-start">
          {score && (
            <span className="flex items-center gap-1 rounded-full border border-yellow-500/20 bg-yellow-500/20 px-3 py-1 text-yellow-500 backdrop-blur-sm">
              ⭐ {score}
            </span>
          )}
          {year && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-gray-300 backdrop-blur-sm">
              {year}
            </span>
          )}
          {genres && (
            <div className="flex gap-2">
              {genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/20 px-3 py-1 text-[11px] tracking-wider text-white/70 uppercase"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>

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
              trailer={true}
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
