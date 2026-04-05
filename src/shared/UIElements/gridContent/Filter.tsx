import type { AnimeFilter, AnimeType } from "../../schemas/animeSchema";

function Filter({
  isFilter = false,
  item,
  type,
  filter,
  typeHandler,
  filterHandler,
}: {
  item:
    | { label: string; value: AnimeType }
    | { label: string; value: AnimeFilter };
  type?: AnimeType;
  filter?: AnimeFilter;
  typeHandler?: (type: AnimeType) => void;
  filterHandler?: (filter: AnimeFilter) => void;
  isFilter?: boolean;
}) {
  return (
    <label key={item.value} className="label cursor-pointer gap-2">
      <input
        type="radio"
        name="anime-type"
        className="radio text-main-btn border-main-btn border-2"
        checked={isFilter ? item.value === filter : type === item.value}
        onChange={() => {
          if (isFilter) filterHandler?.(item.value as AnimeFilter);
          else typeHandler?.(item.value as AnimeType);
        }}
      />
      <span className="label-text">{item.label}</span>
    </label>
  );
}

export default Filter;
