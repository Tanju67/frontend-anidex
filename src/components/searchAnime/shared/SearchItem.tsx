import { Link } from "react-router-dom";
import type { RowSliderItemType } from "../../../shared/schemas/animeSchema";

function SearchItem({ id, title, image, year }: RowSliderItemType) {
  return (
    <li className="mb-2 bg-white/10 p-2 transition-all duration-100 hover:bg-white/10 sm:mb-0 sm:bg-transparent">
      <Link to={`/anime/${id}`}>
        <div className="flex gap-2">
          <div>
            <img
              src={image}
              alt={title}
              className="h-30 max-w-20 object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold sm:text-sm md:text-base">{title}</p>
            <p className="text-xs font-bold sm:text-sm">{year}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default SearchItem;
