import { SlDislike, SlLike } from "react-icons/sl";
import type { ReviewType } from "../../shared/schemas/animeSchema";
import { formatDate } from "../../shared/utils/helper";

interface ReviewModalItemProps {
  reviewItem: ReviewType | null;
}

function ReviewModalItem({ reviewItem }: ReviewModalItemProps) {
  const { name, date, image, review, score, like, dislike } = reviewItem!;
  return (
    <li className="bg-white/10 p-4">
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

      <div className="relative mb-2 h-100 overflow-y-scroll">
        <span>{review}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <span className="content-center-x gap-1">
            <SlLike />
            {like}
          </span>
          <span className="content-center-x gap-1">
            <SlDislike />
            {dislike}
          </span>
        </div>
      </div>
    </li>
  );
}

export default ReviewModalItem;
