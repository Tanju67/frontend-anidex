import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { SliderItemType } from "../../shared/schemas/animeSchema";

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
      <div className="/* mobile */ /* tablet */ /* desktop */ absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.6),rgba(0,0,0,.3),rgba(0,0,0,.4),rgba(0,0,0,.9),rgba(0,0,0,1))] md:bg-[linear-gradient(to_left,rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,.7),rgba(0,0,0,.8),rgba(0,0,0,.9),rgba(0,0,0,1))] lg:bg-[radial-gradient(circle_at_right,rgba(0,0,0,0),rgba(0,0,0,.6),rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,1))]" />

      {/* Content */}
      <div className="relative z-10 mb-10 w-full p-4 text-center md:mb-0 md:flex-1 md:p-[10vw] md:text-left">
        <Link to={`anime/${id}`}>
          <h2 className="mb-2 line-clamp-1 cursor-pointer bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-xl font-extrabold tracking-wide text-transparent drop-shadow-lg sm:text-2xl md:text-3xl lg:mb-4 lg:text-5xl">
            {title}
          </h2>
        </Link>

        <p className="mb-8 flex justify-center gap-4 md:mb-4 md:justify-start">
          {score && (
            <span className="text-sm md:text-base lg:text-lg">
              ⭐ {score} / 10
            </span>
          )}
          {year && (
            <span className="text-sm md:text-base lg:text-lg">📅 {year}</span>
          )}
          {genres && (
            <span className="text-sm md:text-base lg:text-lg">
              🎉 {genres.join(" | ")}
            </span>
          )}
        </p>

        <p className="mb-8 hidden lg:line-clamp-4">{synopsis}</p>

        <button className="bg-main-btn hover:bg-main-btn-hover rounded px-4 py-2 transition-all duration-300">
          Watch Trailer
        </button>
      </div>

      <div className="hidden flex-1 md:block" />
    </motion.div>
  );
}

export default SliderItem;
