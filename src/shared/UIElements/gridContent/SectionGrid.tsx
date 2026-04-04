import { TbFilter2Pause } from "react-icons/tb";
import Filter from "./Filter";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AnimeType } from "../../schemas/animeSchema";
import { typesDataForNewAnimeFilter } from "../../utils/data";

type SectionGridProps = {
  title: string;
  children: React.ReactNode;
  setType?: React.Dispatch<React.SetStateAction<AnimeType>>;
  type?: AnimeType;
  filterData?: { label: string; value: AnimeType }[];
};

function SectionGrid({
  title,
  children,
  setType,
  type,
  filterData,
}: SectionGridProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filterHandler = (type: AnimeType) => {
    if (!setType) return;
    setType(type);
    setIsOpen(false);
  };
  return (
    <section className="mx-auto min-h-screen max-w-300 p-4 lg:p-10">
      <div className="mb-2 flex items-center justify-between sm:mb-4 md:mb-6 lg:mb-10">
        <h2 className="section-title-size">{title}</h2>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={
              "flex items-center justify-center gap-2 px-4 py-2 duration-300 hover:bg-white/10" +
              (isOpen ? " bg-slate-900" : "")
            }
          >
            <TbFilter2Pause className="h-6 w-6" />
            <span>Filter</span>
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-10 right-0 z-50 w-50 bg-slate-900 p-4"
              >
                <div className="flex flex-col gap-4">
                  {filterData!.map((item) => (
                    <Filter
                      key={item.value}
                      item={item}
                      type={type || "all"}
                      filterHandler={filterHandler}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {children}
    </section>
  );
}

export default SectionGrid;
