import { useState } from "react";
import { TbFilter2Pause } from "react-icons/tb";
import { ImSortAmountDesc } from "react-icons/im";
import { GrSort } from "react-icons/gr";
import { TbRating18Plus } from "react-icons/tb";
import type { AnimeFilter, AnimeType } from "../../schemas/animeSchema";
import type { AnimeRating, AnimeStatus } from "../../utils/data";
import Filter from "./Filter";
import FilterButton from "./FilterButton";
import FilterDropdown from "./FilterDropdown";

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
  status?: string;
  setStatus?: React.Dispatch<React.SetStateAction<AnimeStatus>>;
  statusData?: { label: string; value: AnimeStatus }[];
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
  status,
  setStatus,
  statusData,
}: SectionGridProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
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

  const statusHandler = (status: AnimeStatus) => {
    if (!setStatus) return;
    setStatus(status);
    setIsStatusOpen(false);
  };
  return (
    <section className="mx-auto min-h-screen max-w-300 p-4 lg:p-10">
      <div className="mb-2 flex items-center justify-between sm:mb-4 md:mb-6 lg:mb-10">
        <h2 className="section-title-size">{title}</h2>
        <div className="relative">
          <div className="flex">
            {status && (
              <>
                <FilterButton
                  title="Status"
                  isDropdownOpen={isStatusOpen}
                  onClick={() => {
                    setIsStatusOpen(!isStatusOpen);
                    setIsOpen(false);
                    setIsFilterOpen(false);
                    setIsRatingOpen(false);
                  }}
                >
                  <GrSort className="h-6 w-6" />
                </FilterButton>
                <FilterDropdown isDropdownOpen={isStatusOpen}>
                  {statusData!.map((item) => (
                    <Filter
                      label={item.label}
                      key={item.value}
                      checkedValue={item.value === status}
                      onChange={() => statusHandler(item.value as AnimeStatus)}
                    />
                  ))}
                </FilterDropdown>{" "}
              </>
            )}
            {rating && (
              <>
                <FilterButton
                  title="Rating"
                  isDropdownOpen={isRatingOpen}
                  onClick={() => {
                    setIsRatingOpen(!isRatingOpen);
                    setIsOpen(false);
                    setIsFilterOpen(false);
                    setIsStatusOpen(false);
                  }}
                >
                  <TbRating18Plus className="h-6 w-6" />
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
                  title="Status"
                  isDropdownOpen={isFilterOpen}
                  onClick={() => {
                    setIsFilterOpen(!isFilterOpen);
                    setIsOpen(false);
                    setIsRatingOpen(false);
                    setIsStatusOpen(false);
                  }}
                >
                  <ImSortAmountDesc className="h-6 w-6" />
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
                    setIsStatusOpen(false);
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
