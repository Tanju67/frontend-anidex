import { Link } from "react-router-dom";
import type { CreateWatchlistItem } from "../../shared/schemas/backendSchema";
import { RiBookmark2Fill } from "react-icons/ri";

function WatchlistContentItem({
  animeId: id,
  title,
  image,
  handleRemove,
}: CreateWatchlistItem & { handleRemove: (id: string) => void }) {
  return (
    <li className="relative">
      <div>
        <div className="group relative aspect-2/3 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center"
          />
          <Link
            to={`/anime/${id}`}
            className="hover:border-main-btn absolute inset-0 z-10 flex items-center justify-center border-2 bg-black/70 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:border-2"
          ></Link>
        </div>

        <div>
          <p className="mt-1 line-clamp-2 text-sm">{title}</p>
        </div>
      </div>
      <div className="absolute top-0 right-2 z-40">
        <button
          onClick={() => handleRemove(id)}
          className="text-main-btn text-3xl hover:bg-white"
        >
          {" "}
          <RiBookmark2Fill />
        </button>
      </div>
    </li>
  );
}

export default WatchlistContentItem;
