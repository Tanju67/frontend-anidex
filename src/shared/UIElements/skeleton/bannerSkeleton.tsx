import { motion } from "framer-motion";
import Button from "../button/Button";

const BannerSkeleton = () => {
  return (
    <div className="relative h-[calc(80vh-var(--nav-height))] w-full animate-pulse overflow-hidden bg-gray-300/30 md:h-[calc(60vh-var(--nav-height))] lg:h-[calc(100vh-var(--nav-height))]">
      {/* Slide placeholder */}
      <motion.div
        className="absolute inset-0 bg-gray-400/20"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.7 }}
      />

      {/* Buttons placeholders */}
      <Button className="absolute top-1/2 left-4 hidden -translate-y-1/2 rounded-full bg-black/20 p-2 lg:block">
        ◀
      </Button>
      <Button className="absolute top-1/2 right-4 hidden -translate-y-1/2 rounded-full bg-black/20 p-2 lg:block">
        ▶
      </Button>

      {/* Dots placeholders */}
      <div className="absolute bottom-[2vh] left-1/2 z-50 flex -translate-x-1/2 gap-2 md:bottom-[18vh] md:left-[10vw] md:translate-x-0 lg:bottom-[30vh]">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded bg-white/30 ${i === 0 ? "w-8" : "w-4"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSkeleton;
