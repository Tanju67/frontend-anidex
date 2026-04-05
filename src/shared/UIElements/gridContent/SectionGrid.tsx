import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImSortAmountAsc } from "react-icons/im";
import { TbFilter2Pause } from "react-icons/tb";
import type { AnimeFilter, AnimeType } from "../../schemas/animeSchema";
import Filter from "./Filter";

type SectionGridProps = {
  title: string;
  children: React.ReactNode;
  filter?: AnimeFilter;
  setFilter?: React.Dispatch<React.SetStateAction<AnimeFilter>>;
  setType?: React.Dispatch<React.SetStateAction<AnimeType>>;
  type?: AnimeType;
  typeData?: { label: string; value: AnimeType }[];
  filterData?: { label: string; value: AnimeFilter }[];
};

function SectionGrid({
  title,
  children,
  filter,
  setFilter,
  setType,
  type,
  typeData,
  filterData,
}: SectionGridProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const typeHandler = (type: AnimeType) => {
    if (!setType) return;
    setType(type);
    setIsOpen(false);
  };

  const filterHandler = (filter: AnimeFilter) => {
    if (!setFilter) return;
    setFilter(filter);
    setIsFilterOpen(false);
  };
  return (
    <section className="mx-auto min-h-screen max-w-300 p-4 lg:p-10">
      <div className="mb-2 flex items-center justify-between sm:mb-4 md:mb-6 lg:mb-10">
        <h2 className="section-title-size">{title}</h2>
        <div className="relative">
          <div className="flex">
            {filter && (
              <button
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                  setIsOpen(false);
                }}
                className={
                  "flex items-center justify-center gap-2 px-4 py-2 duration-300 hover:bg-white/10" +
                  (isFilterOpen ? " bg-slate-900" : "")
                }
              >
                <ImSortAmountAsc className="h-6 w-6" />
                <span>{filter}</span>
              </button>
            )}
            {type && (
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  setIsFilterOpen(false);
                }}
                className={
                  "flex items-center justify-center gap-2 px-4 py-2 duration-300 hover:bg-white/10" +
                  (isOpen ? " bg-slate-900" : "")
                }
              >
                <TbFilter2Pause className="h-6 w-6" />
                <span>Filter</span>
              </button>
            )}
          </div>

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
                  {typeData!.map((item) => (
                    <Filter
                      key={item.value}
                      item={item}
                      type={type || "all"}
                      typeHandler={typeHandler}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            {isFilterOpen && (
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
                      isFilter={true}
                      key={item.value}
                      item={item}
                      filter={filter || "all"}
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
