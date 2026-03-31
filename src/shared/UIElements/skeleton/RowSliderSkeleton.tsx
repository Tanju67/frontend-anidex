import { useRef } from "react";
import Button from "../button/Button";
import SectionSlider from "../sectionSlider/SectionSlider";

const RowSliderSkeleton = ({ title }: { title?: string }) => {
  const rowRef = useRef<HTMLUListElement>(null);

  const slides = Array(10).fill(0); // placeholder sayısı

  return (
    <SectionSlider title={title} data={[]} skeleton={true}>
      <div className="relative">
        {/* Left Button */}
        <Button className="absolute top-1/2 left-0 z-20 hidden -translate-y-1/2 rounded-full bg-black/20 p-2 md:flex">
          ◀
        </Button>

        {/* Slider Row */}
        <ul
          ref={rowRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-4 md:gap-4"
        >
          {slides.map((_, i) => (
            <li
              key={i}
              className="group relative h-48 w-[40%] shrink-0 animate-pulse snap-start overflow-hidden rounded-lg bg-gray-300 sm:w-[30%] md:h-56 md:w-[25%] lg:h-64 lg:w-[19.5%]"
            >
              {/* Overlay (hover) */}
              <div className="absolute inset-0 rounded-lg bg-black/30 opacity-0" />

              {/* Bottom Info */}
              <div className="absolute bottom-0 h-8 w-full rounded-b-md bg-black/50 p-2 text-xs md:h-10 md:text-sm" />
            </li>
          ))}
        </ul>

        {/* Right Button */}
        <Button className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 rounded-full bg-black/20 p-2 md:flex">
          ▶
        </Button>
      </div>
    </SectionSlider>
  );
};

export default RowSliderSkeleton;
