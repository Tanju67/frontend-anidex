import type { ReviewType } from "../../shared/schemas/animeSchema";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { formatDate } from "../../shared/utils/helper";

function ReviewContentItem({
  date,
  review,
  image,
  name,
  spoiler,
  score,
  like,
  dislike,
}: ReviewType) {
  return (
    <li className="bg-white/10 p-4 text-xs sm:text-sm md:text-base xl:text-lg">
      <div className="mb-2 flex items-center">
        <div className="flex items-center gap-2">
          <img
            src={image}
            alt={name}
            className="h-10 w-10 rounded-full sm:h-12 sm:w-12 md:h-14 md:w-14 xl:h-16 xl:w-16"
          />
          <span className="font-bold">{name}</span>
          <span>⭐ {score}/10</span>
        </div>
        <div className="flex-1 text-end">{formatDate(date)}</div>
      </div>
      <div className="mb-2 line-clamp-4">{review}</div>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <button className="bg-main-btn rounded-sm px-2 py-1">
            Read More
          </button>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center justify-center gap-1">
            <SlLike />
            {like}
          </span>
          <span className="flex items-center justify-center gap-1">
            <SlDislike />
            {dislike}
          </span>
        </div>
      </div>
    </li>
  );
}

export default ReviewContentItem;
