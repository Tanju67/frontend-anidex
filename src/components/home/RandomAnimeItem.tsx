import { motion } from "framer-motion";
import { Clock, Layers, Star } from "lucide-react"; // Tutarlılık için bunları ekledim
import { IoInformationCircleOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import type { SliderItemType } from "../../shared/schemas/animeSchema";
import Button from "../../shared/UIElements/button/Button";

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
    <div className="relative w-full overflow-hidden bg-[#0b0b0b] shadow-2xl lg:rounded-3xl">
      <div
        className="absolute inset-0 z-0 scale-110 opacity-30 blur-2xl"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <div className="absolute inset-0 z-10 bg-linear-to-r from-[#0b0b0b] via-[#0b0b0b]/80 to-[#0b0b0b]" />

      <motion.div
        className="relative z-20 mx-auto flex flex-col items-center gap-6 p-6 md:flex-row md:p-12 lg:w-[90%] lg:gap-12"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-48 shrink-0 shadow-2xl md:w-64 lg:w-72">
          <img
            src={image}
            alt={title || "Random Anime"}
            className="aspect-2/3 w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
          />
        </div>

        <div className="flex flex-1 flex-col items-start text-start">
          <div className="text-main-btn mb-2 flex items-center gap-2">
            <span className="bg-main-btn h-0.5 w-8"></span>
            <span className="text-xs font-black tracking-[0.3em] uppercase">
              Random Recommendation
            </span>
          </div>

          <Link to={`/anime/${id}`} className="group">
            <h2 className="animeTitle group-hover:text-main-btn mb-4 text-3xl transition-colors md:text-4xl lg:text-5xl">
              {title}
            </h2>
          </Link>

          <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-300">
            {year && (
              <div className="flex items-center gap-1">
                <SlCalender className="text-main-btn" />
                <span>{year}</span>
              </div>
            )}
            {score && (
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-white">{score}</span>
              </div>
            )}
            {episodes && (
              <div className="flex items-center gap-1">
                <Layers size={16} className="text-blue-400" />
                <span>{episodes} Episodes</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-sm">
                <Clock size={16} strokeWidth={2} className="text-green-400" />
                <span className="font-medium">{duration}</span>
              </div>
            )}
          </div>

          {/* Synopsis (Daha temiz tipografi) */}
          {synopsis && (
            <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-400 md:text-base lg:line-clamp-4">
              {synopsis}
            </p>
          )}

          {/* Türler */}
          {genres.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {genres.slice(0, 4).map((genre) => (
                <span
                  key={genre}
                  className="hover:border-main-btn hover:text-main-btn rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold tracking-wider text-white/80 uppercase transition-colors"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Buton */}
          <Button
            isLink={true}
            link={`/anime/${id}`}
            className="bg-main-btn hover:bg-main-btn-hover group shadow-main-btn/20 flex items-center gap-3 px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            <IoInformationCircleOutline className="text-xl transition-transform group-hover:rotate-12" />
            <span>More Details</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default RandomAnimeItem;
