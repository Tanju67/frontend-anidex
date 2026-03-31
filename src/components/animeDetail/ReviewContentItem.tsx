import type { ReviewType } from "../../shared/schemas/animeSchema";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { formatDate } from "../../shared/utils/helper";
import { useState } from "react";
import Button from "../../shared/UIElements/button/Button";

type Props = {
  reviewItem: ReviewType;
  setSelectedReview: React.Dispatch<React.SetStateAction<ReviewType | null>>;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReviewContentItem({
  reviewItem,
  setSelectedReview,
  setIsModelOpen,
}: Props) {
  const { name, date, image, spoiler, review, score, like, dislike } =
    reviewItem;
  const [blur, setBlur] = useState(spoiler);
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
      {blur && (
        <div className="flex justify-evenly bg-red-500">
          <button onClick={() => setBlur(false)}>Continue to Read</button>
        </div>
      )}
      <div className="relative mb-2 line-clamp-4">
        <span>{review}</span>
        {blur && (
          <span className="content-center-x absolute top-0 left-0 h-full w-full backdrop-blur">
            <span className="bg-red-500/50 p-1">Spoiler Alert</span>
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Button
            onClick={() => {
              setSelectedReview(reviewItem);
              setIsModelOpen(true);
            }}
            className="bg-main-btn hover:bg-main-btn-hover px-2 py-1"
          >
            Read More
          </Button>
        </div>
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

export default ReviewContentItem;
