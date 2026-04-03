import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { RowSliderItemType } from "../../schemas/animeSchema";

function RowSliderItem({ image, title, year, id }: RowSliderItemType) {
  return (
    <motion.div className="group relative w-[40%] shrink-0 cursor-pointer snap-start overflow-hidden rounded-lg sm:w-[30%] md:w-[25%] lg:w-[19.5%]">
      <motion.img
        src={image}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Overlay */}
      <Link
        to={`/anime/${id}`}
        className="hover:border-main-btn absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/70 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:border-2"
      >
        <span className="bg-main-btn/50 hover:bg-main-btn h-10 w-10 rounded-full transition-colors duration-300"></span>
      </Link>

      {/* Bottom Info */}
      <div className="bg-main-btn/80 absolute bottom-0 flex w-full items-center justify-between p-2 text-xs text-white md:text-sm">
        {title && <span className="line-clamp-1 flex-2">{title}</span>}
        {year && (
          <span className="hidden flex-1 text-right md:block">{year}</span>
        )}
      </div>
    </motion.div>
  );
}

export default RowSliderItem;
