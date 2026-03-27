import { useRef } from "react";
import type { RowSliderType } from "../../schemas/animeSchema";
import RowSliderItem from "./RowSliderItem";

interface RowSliderProps {
  items: RowSliderType;
}

const RowSlider: React.FC<RowSliderProps> = ({ items }) => {
  const rowRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

    rowRef.current.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left Button - Desktop only */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 left-0 z-20 hidden -translate-y-1/2 rounded-full bg-black/80 p-2 md:flex"
      >
        ◀
      </button>

      {/* Slider Row */}
      <ul
        ref={rowRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-4 md:gap-4"
      >
        {items.map((item, i) => (
          <RowSliderItem
            key={i}
            image={item.image}
            title={item.title}
            year={item.year}
            id={item.id}
          />
        ))}
      </ul>

      {/* Right Button - Desktop only */}
      <button
        onClick={() => scroll("right")}
        className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 rounded-full bg-black/80 p-2 md:flex"
      >
        ▶
      </button>
    </div>
  );
};

export default RowSlider;
