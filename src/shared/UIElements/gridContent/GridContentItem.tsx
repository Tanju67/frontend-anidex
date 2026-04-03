import { Link } from "react-router-dom";
import type { RowSliderItemType } from "../../schemas/animeSchema";

function GridContentItem({ id, title, image }: RowSliderItemType) {
  return (
    <li>
      <div>
        <div className="group relative aspect-2/3 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center"
          />
          <Link
            to={`/anime/${id}`}
            className="hover:border-main-btn absolute inset-0 z-10 flex items-center justify-center bg-black/70 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:border-2"
          >
            <span className="bg-main-btn/50 hover:bg-main-btn h-10 w-10 rounded-full transition-colors duration-300"></span>
          </Link>
        </div>

        <div>
          <p className="mt-1 line-clamp-2 text-sm">{title}</p>
        </div>
      </div>
    </li>
  );
}

export default GridContentItem;
