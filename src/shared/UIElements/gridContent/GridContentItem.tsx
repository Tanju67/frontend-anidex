import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { RowSliderItemType } from "../../schemas/animeSchema";

function GridContentItem({ id, title, image }: RowSliderItemType) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="list-none"
    >
      <div className="group flex flex-col gap-2">
        {/* Resim Konteynırı */}
        <div className="group-hover:shadow-main-btn/10 relative aspect-2/3 w-full overflow-hidden rounded-xl bg-neutral-800 shadow-md transition-all duration-300 group-hover:shadow-xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          <Link
            to={`/anime/${id}`}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100"
          >
            <div className="bg-main-btn scale-75 rounded-full p-3 text-white shadow-lg transition-transform duration-300 group-hover:scale-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </div>
            <span className="mt-2 text-[10px] font-bold tracking-widest text-white/90 uppercase">
              Details
            </span>
          </Link>

          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
        </div>

        <div className="flex flex-col">
          <h3 className="group-hover:text-main-btn line-clamp-2 text-xs leading-snug font-semibold text-gray-300 transition-colors duration-300 md:text-sm">
            {title}
          </h3>
        </div>
      </div>
    </motion.li>
  );
}

export default GridContentItem;
