import type { AnimeType } from "../../schemas/animeSchema";

function Filter({
  item,
  type,
  filterHandler,
}: {
  item: { label: string; value: AnimeType };
  type: AnimeType;
  filterHandler: (type: AnimeType) => void;
}) {
  return (
    <label key={item.value} className="label cursor-pointer gap-2">
      <input
        type="radio"
        name="anime-type"
        className="radio text-main-btn border-main-btn border-2"
        checked={type === item.value}
        onChange={() => filterHandler(item.value)}
      />
      <span className="label-text">{item.label}</span>
    </label>
  );
}

export default Filter;
