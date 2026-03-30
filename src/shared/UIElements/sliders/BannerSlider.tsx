import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SliderItem from "../../../components/home/SliderItem";
import type { BannerSliderType } from "../../schemas/animeSchema";

interface BannerSliderProps {
  items: BannerSliderType;
  interval?: number;
}

const BannerSlider: React.FC<BannerSliderProps> = ({
  items,
  interval = 10000,
}) => {
  const [index, setIndex] = useState(0);
  // const [isPaused, setIsPaused] = useState(false);

  const currentItem = items[index];

  useEffect(() => {
    if (!items || items.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval, items]);

  if (!items || items.length === 0) return null;

  const next = () => {
    // setIsPaused(true);
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    // setIsPaused(true);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div
      className="relative h-[calc(80vh-var(--nav-height))] w-full overflow-hidden md:h-[calc(60vh-var(--nav-height))] lg:h-[calc(100vh-var(--nav-height))]"
      // onMouseEnter={() => setIsPaused(true)}
      // onMouseLeave={() => setIsPaused(false)}
    >
      {/* 🎬 Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <SliderItem {...currentItem} />
        </motion.div>
      </AnimatePresence>

      {/* ⬅️➡️ Buttons */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 lg:block"
      >
        ◀
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 lg:block"
      >
        ▶
      </button>

      {/* 🔘 Dots */}
      <div className="absolute bottom-[2vh] left-1/2 z-50 flex -translate-x-1/2 gap-2 md:bottom-[18vh] md:left-[10vw] md:translate-x-0 lg:bottom-[30vh]">
        {items.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 overflow-hidden rounded bg-white/30 transition-all duration-200 ease-in-out ${
              i === index ? "w-8" : "w-4"
            }`}
          >
            {i === index && (
              <motion.div
                className="bg-main-btn h-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: interval / 1000, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
