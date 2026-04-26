import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { RowSliderItemType } from "../../../shared/schemas/animeSchema";

function SearchItem({ id, title, image, year }: RowSliderItemType) {
  return (
    <motion.li whileHover={{ x: 5 }} className="group list-none">
      <Link
        to={`/anime/${id}`}
        className="flex items-center gap-4 rounded-lg border border-transparent p-2 transition-all duration-300 hover:border-white/10 hover:bg-white/5"
      >
        <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-md shadow-md">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        <div className="flex flex-col justify-center overflow-hidden">
          <h4 className="group-hover:text-main-btn line-clamp-1 text-sm font-bold text-gray-200 transition-colors md:text-base">
            {title}
          </h4>

          <div className="mt-1 flex items-center gap-2">
            {year && (
              <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
                {year}
              </span>
            )}
            <span className="text-main-btn text-[10px] tracking-tighter uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}

export default SearchItem;
