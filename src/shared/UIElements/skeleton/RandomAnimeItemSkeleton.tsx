import { motion } from "framer-motion";

const RandomAnimeItemSkeleton = () => {
  return (
    <div className="section-padding main-text-size">
      <h2 className="section-title-size mb-2 md:mb-4 md:text-center">
        Discover Something New
      </h2>
      <div className="relative w-full lg:py-8">
        {/* Gradient overlay placeholder */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/95 to-black/90" />

        {/* Content */}
        <motion.div
          className="content-center-x relative z-10 mx-auto h-full gap-4 p-2 text-center md:p-12 lg:w-4/5 lg:gap-16 lg:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mx-auto">
            {/* Image placeholder */}
            <div className="h-60 w-40 animate-pulse rounded-2xl bg-gray-300 md:h-80 md:w-50 lg:h-120 lg:w-80" />
          </div>

          <div className="flex w-full flex-1 flex-col items-start justify-start gap-2">
            {/* Title placeholder */}
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-400 md:h-8 md:w-1/2 lg:h-10" />

            {/* Info placeholders */}
            <div className="mt-2 flex gap-4 text-sm md:text-base lg:text-lg">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-400 md:h-5 md:w-20" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-400 md:h-5 md:w-24" />
              <div className="h-4 w-12 animate-pulse rounded bg-gray-400 md:h-5 md:w-16" />
            </div>

            {/* Synopsis placeholder */}
            <div className="mt-2 h-16 w-full animate-pulse rounded bg-gray-300 md:h-24 lg:h-32" />

            {/* Genres placeholder */}
            <div className="mt-2 flex gap-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-400 md:h-5 md:w-32" />
              <div className="h-4 w-32 animate-pulse rounded bg-gray-400 md:h-5 md:w-40" />
            </div>

            {/* Button placeholder */}
            <div className="mt-4 h-10 w-36 animate-pulse rounded bg-gray-400 md:h-12 md:w-48 lg:h-14 lg:w-56" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RandomAnimeItemSkeleton;
