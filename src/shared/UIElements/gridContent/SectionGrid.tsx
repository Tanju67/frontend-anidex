import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImSortAmountAsc } from "react-icons/im";
import { TbFilter2Pause } from "react-icons/tb";
import type { AnimeFilter, AnimeType } from "../../schemas/animeSchema";
import type { AnimeRating } from "../../utils/data";
import Filter from "./Filter";
import FilterButton from "./FilterButton";
import FilterDropdown from "./FilterDropdown";
import { is } from "zod/v4/locales";

type SectionGridProps = {
  title: string;
  children: React.ReactNode;
  filter?: AnimeFilter;
  setFilter?: React.Dispatch<React.SetStateAction<AnimeFilter>>;
  setType?: React.Dispatch<React.SetStateAction<AnimeType>>;
  type?: AnimeType;
  typeData?: { label: string; value: AnimeType }[];
  filterData?: { label: string; value: AnimeFilter }[];
  rating?: AnimeRating;
  setRating?: React.Dispatch<React.SetStateAction<AnimeRating>>;
  ratingData?: { label: string; value: AnimeRating }[];
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
  rating,
  setRating,
  ratingData,
}: SectionGridProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
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

  const ratingHandler = (rating: AnimeRating) => {
    if (!setRating) return;
    setRating(rating);
    setIsRatingOpen(false);
  };
  return (
    <section className="mx-auto min-h-screen max-w-300 p-4 lg:p-10">
      <div className="mb-2 flex items-center justify-between sm:mb-4 md:mb-6 lg:mb-10">
        <h2 className="section-title-size">{title}</h2>
        <div className="relative">
          <div className="flex">
            {rating && (
              <>
                <FilterButton
                  title="Rating"
                  isDropdownOpen={isRatingOpen}
                  onClick={() => {
                    setIsRatingOpen(!isRatingOpen);
                    setIsOpen(false);
                    setIsFilterOpen(false);
                  }}
                >
                  <TbFilter2Pause className="h-6 w-6" />
                </FilterButton>
                <FilterDropdown isDropdownOpen={isRatingOpen}>
                  {ratingData!.map((item) => (
                    <Filter
                      label={item.label}
                      key={item.value}
                      checkedValue={item.value === rating}
                      onChange={() => ratingHandler(item.value as AnimeRating)}
                    />
                  ))}
                </FilterDropdown>{" "}
              </>
            )}
            {filter && (
              <>
                <FilterButton
                  title="Filter"
                  isDropdownOpen={isFilterOpen}
                  onClick={() => {
                    setIsFilterOpen(!isFilterOpen);
                    setIsOpen(false);
                    setIsRatingOpen(false);
                  }}
                >
                  <TbFilter2Pause className="h-6 w-6" />
                </FilterButton>
                <FilterDropdown isDropdownOpen={isFilterOpen}>
                  {filterData!.map((item) => (
                    <Filter
                      label={item.label}
                      key={item.value}
                      checkedValue={item.value === filter}
                      onChange={() => filterHandler(item.value as AnimeFilter)}
                    />
                  ))}
                </FilterDropdown>{" "}
              </>
            )}
            {type && (
              <>
                <FilterButton
                  title="Filter"
                  isDropdownOpen={isOpen}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setIsFilterOpen(false);
                    setIsRatingOpen(false);
                  }}
                >
                  <TbFilter2Pause className="h-6 w-6" />
                </FilterButton>
                <FilterDropdown isDropdownOpen={isOpen}>
                  {typeData!.map((item) => (
                    <Filter
                      label={item.label}
                      key={item.value}
                      checkedValue={item.value === type}
                      onChange={() => typeHandler(item.value as AnimeType)}
                    />
                  ))}
                </FilterDropdown>{" "}
              </>
            )}
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}

export default SectionGrid;
